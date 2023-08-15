import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

import { getUserViewsApi } from '@jellyfin/sdk/lib/utils/api/user-views-api';
import { getItemsApi } from '@jellyfin/sdk/lib/utils/api/items-api';
import { getTvShowsApi } from '@jellyfin/sdk/lib/utils/api/tv-shows-api';
import { getUserLibraryApi } from '@jellyfin/sdk/lib/utils/api/user-library-api';
import { Media, SerieEpisode } from '../classes/media.class';
import { Observable } from 'rxjs';
import { ImageType } from '@jellyfin/sdk/lib/generated-client/models';
import { Router } from '@angular/router';
import { JellyfinAPIService } from './jellyfin-api.service';

import {
    BaseItemDto,
    ItemFields,
    ItemFilter,
    MediaSourceInfo,
    SubtitleDeliveryMethod,
    MediaStream,
    BaseItemKind,
    PlaybackInfoResponse,
    MediaStreamType
  } from '@jellyfin/sdk/lib/generated-client';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

    private playingMedia!: Media;

    constructor( private router: Router, private messageService: MessageService, private jellyfinApi: JellyfinAPIService) {
    }

    public play(media: Media){
        this.playingMedia = media;
        this.router.navigate(['play']);
    }

    // public getItemPlaybackInfo (): Promise<PlaybackInfoResponse | undefined>{
        
    //     await remote.sdk.newUserApi(getMediaInfoApi).getPostedPlaybackInfo({
    //         itemId: item?.Id || '',
    //         userId: remote.auth.currentUserId,
    //         autoOpenLiveStream: true,
    //         playbackInfoDto: { DeviceProfile: playbackProfile },
    //         mediaSourceId:
    //         item.MediaSources?.[mediaSourceIndex ?? 0].Id ?? item?.Id,
    //         audioStreamIndex,
    //         subtitleStreamIndex
    //     })
    // }

    public getItemPlaybackUrl(): string{
        if ( this.jellyfinApi.getUser().AccessToken ) {
          let directOptions: Record<string, string> = {
            Static: String(true),
            mediaSourceId: this.playingMedia.id,
            deviceId: this.jellyfinApi.getJellyfin().deviceInfo.id,
            api_key: this.jellyfinApi.getUser().AccessToken
          };
    
          const parameters = new URLSearchParams(directOptions).toString();
          
          return `${this.jellyfinApi.getApi().basePath}/Videos/${this.playingMedia.id}/stream.${this.playingMedia.container}?${parameters}`;
        }else{
            return '';
        }
        // } else if (media.supportsTranscoding && media.transcodingUrl) {
        //   return remote.sdk.api?.basePath + mediaSource.TranscodingUrl;
        // }
      };
}