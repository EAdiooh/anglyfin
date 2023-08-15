import { Injectable } from '@angular/core';
import { Jellyfin } from '@jellyfin/sdk';
import { getSystemApi, getLibraryApi } from '@jellyfin/sdk/lib/utils/api';
import { MessageService } from 'primeng/api';
import { Api } from '@jellyfin/sdk';

import { getUserViewsApi } from '@jellyfin/sdk/lib/utils/api/user-views-api';
import { getItemsApi } from '@jellyfin/sdk/lib/utils/api/items-api';
import { getTvShowsApi } from '@jellyfin/sdk/lib/utils/api/tv-shows-api';
import { getUserLibraryApi } from '@jellyfin/sdk/lib/utils/api/user-library-api';
import { Media, SerieEpisode } from '../classes/media.class';
import { Observable } from 'rxjs';
import { ImageType } from '@jellyfin/sdk/lib/generated-client/models';



@Injectable({
  providedIn: 'root'
})
export class JellyfinAPIService {

    private jellyfin :Jellyfin = new Jellyfin({
        clientInfo: {
            name: 'Anglyfin',
            version: '1.0.0'
        },
        deviceInfo: {
            name: 'Device Name',
            id: 'unique-device-id'
        }
    });

    private api!: Api;
    private user: any;
    public toFollow: SerieEpisode[] = [];

    constructor(private messageService: MessageService,) {
    }

    public connectToServer(address: string): Promise<boolean>{
        return new Promise(async (resolve, reject) => {
            try {
                this.api = this.jellyfin.createApi(address);
                await getSystemApi(this.api).getPublicSystemInfo();
                resolve(true);
            } catch (error: any) {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message });
                reject(error);
            }
        });
    }

    public login(username: string, password: string){
        return new Promise(async (resolve, reject) => {
            try {
                let auth = await this.api.authenticateUserByName(username, password);
                this.user = auth.data
                this.getToFollow();
                resolve(true);
            } catch (error: any) {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message });
                reject(error);
            }
        });
    }

    public returnLibraries(){
        return new Promise(async (resolve, reject) => {
            try {
                let libraries  = await getLibraryApi(this.api).getMediaFolders();
                resolve(libraries.data);
            } catch (error: any) {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message });
                reject(error);
            }
        });
    }

    public getToFollow(): Promise<boolean>{
        return new Promise(async (resolve, reject) => {
            try {
                let result = await getTvShowsApi(this.api).getNextUp({userId: this.user.User.Id});
                if(result.data.Items){
                    result.data.Items.forEach((item: any) => {
                        this.toFollow.push(new SerieEpisode(item));
                    });
                }
                resolve(true);
            } catch (error: any) {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message });
                reject(error);
            }
        });
    }

    public getImage(itemId: string, imgType: ImageType | undefined): string{
        let url = this.api.getItemImageUrl(itemId, imgType);
        if(url){
            return url;
        }
        return '';
    }

    public getItemPlaybackUrl (media: Media): string{
        if (  this.user.currentUserToken ) {
          let directOptions: Record<string, string> = {
            Static: String(true),
            mediaSourceId: media.id,
            deviceId: this.jellyfin.deviceInfo.id,
            api_key: this.user.currentUserToken
          };
    
          const parameters = new URLSearchParams(directOptions).toString();
          return `${this.api.basePath}/Video/${media.id}/stream.${media.container}?${parameters}`;
        }else{
            return '';
        }
        // } else if (media.supportsTranscoding && media.transcodingUrl) {
        //   return remote.sdk.api?.basePath + mediaSource.TranscodingUrl;
        // }
      };
}