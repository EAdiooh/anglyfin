import { Injectable, WritableSignal, signal } from '@angular/core';
import { Jellyfin } from '@jellyfin/sdk';
import { getSystemApi, getLibraryApi, getMediaInfoApi } from '@jellyfin/sdk/lib/utils/api';
import { MessageService } from 'primeng/api';
import { Api } from '@jellyfin/sdk';

import { getUserViewsApi } from '@jellyfin/sdk/lib/utils/api/user-views-api';
import { getItemsApi } from '@jellyfin/sdk/lib/utils/api/items-api';
import { getTvShowsApi } from '@jellyfin/sdk/lib/utils/api/tv-shows-api';
import { getUserLibraryApi } from '@jellyfin/sdk/lib/utils/api/user-library-api';
import { Media, Movie, SerieEpisode } from '../classes/media.class';
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
    public toFollow: WritableSignal<SerieEpisode[]> = signal<SerieEpisode[]>([]);
    public resume: WritableSignal<Media[]> = signal<Media[]>([]);
    
    private profileRequestBody = {
        "DeviceProfile": {
          "MaxStreamingBitrate": 120000000,
          "MaxStaticBitrate": 100000000,
          "MusicStreamingTranscodingBitrate": 384000,
          "DirectPlayProfiles": [
            {
              "Container": "webm",
              "Type": "Video",
              "VideoCodec": "vp8,vp9",
              "AudioCodec": "vorbis"
            },
            {
              "Container": "mp4,m4v",
              "Type": "Video",
              "VideoCodec": "h264,vp8,vp9",
              "AudioCodec": "aac,mp3,ac3,eac3,flac,alac,vorbis"
            },
            {
              "Container": "mov",
              "Type": "Video",
              "VideoCodec": "h264",
              "AudioCodec": "aac,mp3,ac3,eac3,flac,alac,vorbis"
            },
            {
              "Container": "mp3",
              "Type": "Audio"
            },
            {
              "Container": "aac",
              "Type": "Audio"
            },
            {
              "Container": "m4a",
              "AudioCodec": "aac",
              "Type": "Audio"
            },
            {
              "Container": "m4b",
              "AudioCodec": "aac",
              "Type": "Audio"
            },
            {
              "Container": "flac",
              "Type": "Audio"
            },
            {
              "Container": "alac",
              "Type": "Audio"
            },
            {
              "Container": "m4a",
              "AudioCodec": "alac",
              "Type": "Audio"
            },
            {
              "Container": "m4b",
              "AudioCodec": "alac",
              "Type": "Audio"
            },
            {
              "Container": "webma",
              "Type": "Audio"
            },
            {
              "Container": "webm",
              "AudioCodec": "webma",
              "Type": "Audio"
            },
            {
              "Container": "wav",
              "Type": "Audio"
            }
          ],
          "TranscodingProfiles": [
            {
              "Container": "aac",
              "Type": "Audio",
              "AudioCodec": "aac",
              "Context": "Streaming",
              "Protocol": "hls",
              "MaxAudioChannels": "6",
              "MinSegments": "2",
              "BreakOnNonKeyFrames": true
            },
            {
              "Container": "aac",
              "Type": "Audio",
              "AudioCodec": "aac",
              "Context": "Streaming",
              "Protocol": "http",
              "MaxAudioChannels": "6"
            },
            {
              "Container": "mp3",
              "Type": "Audio",
              "AudioCodec": "mp3",
              "Context": "Streaming",
              "Protocol": "http",
              "MaxAudioChannels": "6"
            },
            {
              "Container": "wav",
              "Type": "Audio",
              "AudioCodec": "wav",
              "Context": "Streaming",
              "Protocol": "http",
              "MaxAudioChannels": "6"
            },
            {
              "Container": "mp3",
              "Type": "Audio",
              "AudioCodec": "mp3",
              "Context": "Static",
              "Protocol": "http",
              "MaxAudioChannels": "6"
            },
            {
              "Container": "aac",
              "Type": "Audio",
              "AudioCodec": "aac",
              "Context": "Static",
              "Protocol": "http",
              "MaxAudioChannels": "6"
            },
            {
              "Container": "wav",
              "Type": "Audio",
              "AudioCodec": "wav",
              "Context": "Static",
              "Protocol": "http",
              "MaxAudioChannels": "6"
            },
            {
              "Container": "ts",
              "Type": "Video",
              "AudioCodec": "aac,mp3,ac3,eac3",
              "VideoCodec": "h264",
              "Context": "Streaming",
              "Protocol": "hls",
              "MaxAudioChannels": "6",
              "MinSegments": "2",
              "BreakOnNonKeyFrames": true
            },
            {
              "Container": "webm",
              "Type": "Video",
              "AudioCodec": "vorbis",
              "VideoCodec": "vpx",
              "Context": "Streaming",
              "Protocol": "http",
              "MaxAudioChannels": "6"
            },
            {
              "Container": "mp4",
              "Type": "Video",
              "AudioCodec": "aac,mp3,ac3,eac3,flac,alac,vorbis",
              "VideoCodec": "h264",
              "Context": "Static",
              "Protocol": "http"
            }
          ],
          "ContainerProfiles": [],
          "CodecProfiles": [
            {
              "Type": "Video",
              "Codec": "h264",
              "Conditions": [
                {
                  "Condition": "NotEquals",
                  "Property": "IsAnamorphic",
                  "Value": "true",
                  "IsRequired": false
                },
                {
                  "Condition": "EqualsAny",
                  "Property": "VideoProfile",
                  "Value": "high|main|baseline|constrained baseline",
                  "IsRequired": false
                },
                {
                  "Condition": "LessThanEqual",
                  "Property": "VideoLevel",
                  "Value": "51",
                  "IsRequired": false
                },
                {
                  "Condition": "NotEquals",
                  "Property": "IsInterlaced",
                  "Value": "true",
                  "IsRequired": false
                }
              ]
            },
            {
              "Type": "Video",
              "Codec": "hevc",
              "Conditions": [
                {
                  "Condition": "NotEquals",
                  "Property": "IsAnamorphic",
                  "Value": "true",
                  "IsRequired": false
                },
                {
                  "Condition": "EqualsAny",
                  "Property": "VideoProfile",
                  "Value": "main|main 10",
                  "IsRequired": false
                },
                {
                  "Condition": "LessThanEqual",
                  "Property": "VideoLevel",
                  "Value": "183",
                  "IsRequired": false
                },
                {
                  "Condition": "NotEquals",
                  "Property": "IsInterlaced",
                  "Value": "true",
                  "IsRequired": false
                }
              ]
            }
          ],
          "SubtitleProfiles": [
            {
              "Format": "vtt",
              "Method": "External"
            },
            {
              "Format": "ass",
              "Method": "External"
            },
            {
              "Format": "ssa",
              "Method": "External"
            }
          ],
          "ResponseProfiles": [
            {
              "Type": "Video",
              "Container": "m4v",
              "MimeType": "video/mp4"
            }
          ]
        }
      }

    constructor(private messageService: MessageService,) {
    }

    getJellyfin(){
        return this.jellyfin;
    }

    getUser(){
        return this.user;
    }

    getApi(){
        return this.api;
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
                this.getResume();
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
                this.toFollow.set([]);
                result.data.Items.forEach((item: any) => {
                  this.toFollow.mutate(values => values.push( new SerieEpisode(item)))
                });
              }
              resolve(true);
            } catch (error: any) {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message });
                reject(error);
            }
        });
    }

    public getResume(): Promise<boolean>{
      return new Promise(async (resolve, reject) => {
          try {
            let result = await getItemsApi(this.api).getResumeItems({userId: this.user.User.Id});
            if(result.data.Items){
              this.resume.set([]);
              result.data.Items.forEach((item: any) => {
                if(item.Type === "Movie"){ 
                  this.resume.mutate(values => values.push( new Movie(item)))
                }else if(item.Type === "Episode"){
                  this.resume.mutate(values => values.push( new SerieEpisode(item)))
                }
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

    public getMediaInfo(media_id: string): Promise<boolean>{
        return new Promise(async (resolve, reject) => {
            try {
                let result = await getMediaInfoApi(this.api).getPlaybackInfo({itemId: media_id,userId: this.user.User.Id}, {"data": this.profileRequestBody});
                console.log(result)
                resolve(true);
            } catch (error: any) {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message });
                reject(error);
            }
        });
    }
    
}