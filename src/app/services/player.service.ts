import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { catchError, map, tap } from 'rxjs/operators';
import { getUserViewsApi } from '@jellyfin/sdk/lib/utils/api/user-views-api';
import { getItemsApi } from '@jellyfin/sdk/lib/utils/api/items-api';
import { getTvShowsApi } from '@jellyfin/sdk/lib/utils/api/tv-shows-api';
import { getUserLibraryApi } from '@jellyfin/sdk/lib/utils/api/user-library-api';
import { Media, SerieEpisode } from '../classes/media.class';
import { Observable, Subject } from 'rxjs';
import { ImageType } from '@jellyfin/sdk/lib/generated-client/models';
import { Router } from '@angular/router';
import { JellyfinAPIService } from './jellyfin-api.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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

    public playingMedia!: Media;

    private profileRequestBody = {
      "DeviceProfile": {
        "CodecProfiles": [
          {
            "Codec": "aac",
            "Conditions": [
              {
                "Condition": "Equals",
                "IsRequired": false,
                "Property": "IsSecondaryAudio",
                "Value": "false"
              }
            ],
            "Type": "VideoAudio"
          },
          {
            "Conditions": [
              {
                "Condition": "Equals",
                "IsRequired": false,
                "Property": "IsSecondaryAudio",
                "Value": "false"
              }
            ],
            "Type": "VideoAudio"
          },
          {
            "Codec": "h264",
            "Conditions": [
              {
                "Condition": "NotEquals",
                "IsRequired": false,
                "Property": "IsAnamorphic",
                "Value": "true"
              },
              {
                "Condition": "EqualsAny",
                "IsRequired": false,
                "Property": "VideoProfile",
                "Value": "high|main|baseline|constrained baseline"
              },
              {
                "Condition": "EqualsAny",
                "IsRequired": false,
                "Property": "VideoRangeType",
                "Value": "SDR"
              },
              {
                "Condition": "LessThanEqual",
                "IsRequired": false,
                "Property": "VideoLevel",
                "Value": "52"
              },
              {
                "Condition": "NotEquals",
                "IsRequired": false,
                "Property": "IsInterlaced",
                "Value": "true"
              }
            ],
            "Type": "Video"
          },
          {
            "Codec": "hevc",
            "Conditions": [
              {
                "Condition": "NotEquals",
                "IsRequired": false,
                "Property": "IsAnamorphic",
                "Value": "true"
              },
              {
                "Condition": "EqualsAny",
                "IsRequired": false,
                "Property": "VideoProfile",
                "Value": "main"
              },
              {
                "Condition": "EqualsAny",
                "IsRequired": false,
                "Property": "VideoRangeType",
                "Value": "SDR"
              },
              {
                "Condition": "LessThanEqual",
                "IsRequired": false,
                "Property": "VideoLevel",
                "Value": "120"
              },
              {
                "Condition": "NotEquals",
                "IsRequired": false,
                "Property": "IsInterlaced",
                "Value": "true"
              }
            ],
            "Type": "Video"
          },
          {
            "Codec": "vp9",
            "Conditions": [
              {
                "Condition": "EqualsAny",
                "IsRequired": false,
                "Property": "VideoRangeType",
                "Value": "SDR|HDR10|HLG"
              }
            ],
            "Type": "Video"
          },
          {
            "Codec": "av1",
            "Conditions": [
              {
                "Condition": "EqualsAny",
                "IsRequired": false,
                "Property": "VideoRangeType",
                "Value": "SDR|HDR10|HLG"
              }
            ],
            "Type": "Video"
          }
        ],
        "ContainerProfiles": [],
        "DirectPlayProfiles": [
          {
            "AudioCodec": "vorbis,opus",
            "Container": "webm",
            "Type": "Video",
            "VideoCodec": "vp8,vp9,av1"
          },
          {
            "AudioCodec": "aac,mp3,opus,flac,vorbis",
            "Container": "mp4,m4v",
            "Type": "Video",
            "VideoCodec": "h264,vp9,av1"
          },
          {
            "Container": "opus",
            "Type": "Audio"
          },
          {
            "AudioCodec": "opus",
            "Container": "webm",
            "Type": "Audio"
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
            "AudioCodec": "aac",
            "Container": "m4a",
            "Type": "Audio"
          },
          {
            "AudioCodec": "aac",
            "Container": "m4b",
            "Type": "Audio"
          },
          {
            "Container": "flac",
            "Type": "Audio"
          },
          {
            "Container": "webma",
            "Type": "Audio"
          },
          {
            "AudioCodec": "webma",
            "Container": "webm",
            "Type": "Audio"
          },
          {
            "Container": "wav",
            "Type": "Audio"
          },
          {
            "Container": "ogg",
            "Type": "Audio"
          }
        ],
        "MaxStaticBitrate": 100000000,
        "MaxStreamingBitrate": 120000000,
        "MusicStreamingTranscodingBitrate": 384000,
        "ResponseProfiles": [
          {
            "Container": "m4v",
            "MimeType": "video/mp4",
            "Type": "Video"
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
        "TranscodingProfiles": [
          {
            "AudioCodec": "aac",
            "BreakOnNonKeyFrames": true,
            "Container": "ts",
            "Context": "Streaming",
            "MaxAudioChannels": "2",
            "MinSegments": "1",
            "Protocol": "hls",
            "Type": "Audio"
          },
          {
            "AudioCodec": "aac",
            "Container": "aac",
            "Context": "Streaming",
            "MaxAudioChannels": "2",
            "Protocol": "http",
            "Type": "Audio"
          },
          {
            "AudioCodec": "mp3",
            "Container": "mp3",
            "Context": "Streaming",
            "MaxAudioChannels": "2",
            "Protocol": "http",
            "Type": "Audio"
          },
          {
            "AudioCodec": "opus",
            "Container": "opus",
            "Context": "Streaming",
            "MaxAudioChannels": "2",
            "Protocol": "http",
            "Type": "Audio"
          },
          {
            "AudioCodec": "wav",
            "Container": "wav",
            "Context": "Streaming",
            "MaxAudioChannels": "2",
            "Protocol": "http",
            "Type": "Audio"
          },
          {
            "AudioCodec": "opus",
            "Container": "opus",
            "Context": "Static",
            "MaxAudioChannels": "2",
            "Protocol": "http",
            "Type": "Audio"
          },
          {
            "AudioCodec": "mp3",
            "Container": "mp3",
            "Context": "Static",
            "MaxAudioChannels": "2",
            "Protocol": "http",
            "Type": "Audio"
          },
          {
            "AudioCodec": "aac",
            "Container": "aac",
            "Context": "Static",
            "MaxAudioChannels": "2",
            "Protocol": "http",
            "Type": "Audio"
          },
          {
            "AudioCodec": "wav",
            "Container": "wav",
            "Context": "Static",
            "MaxAudioChannels": "2",
            "Protocol": "http",
            "Type": "Audio"
          },
          {
            "AudioCodec": "aac,mp3",
            "BreakOnNonKeyFrames": true,
            "Container": "ts",
            "Context": "Streaming",
            "MaxAudioChannels": "2",
            "MinSegments": "1",
            "Protocol": "hls",
            "Type": "Video",
            "VideoCodec": "h264"
          }
        ]
      }
    }

    constructor(private http: HttpClient, private router: Router, private messageService: MessageService, private jellyfinApi: JellyfinAPIService, ) {
    }

    public play(media: Media){
        this.playingMedia = media;
        this.router.navigate(['play']);
    }

    public getplayMediaInfo(id: string){
      let headers = new HttpHeaders().set('X-Emby-Authorization', `Emby UserId="${this.jellyfinApi.getUser().User.Name}", Client="media_cleaner", Device="media_cleaner", DeviceId="media_cleaner", Version="0.2", Token="${this.jellyfinApi.getUser().AccessToken}"`);
      let params = new HttpParams().set('UserId', this.jellyfinApi.getUser().User.Id);

      // if(this.playingMedia.runTimeTicks > 0){
      //   params = params.append('StartTimeTicks', this.playingMedia.runTimeTicks);
      // }
      
      return this.http.post<any>(`${this.jellyfinApi.getApi().basePath}/Items/${id}/PlaybackInfo`, this.profileRequestBody ,{headers: headers, params: params})
      .pipe(
        map( result => {
          return result
       })
      );
    }

    public getItemPlaybackUrl(): any{
      return new Promise(async (resolve) => {
        this.getplayMediaInfo(this.playingMedia.id).subscribe((playbackInfo) => {
          if(playbackInfo.MediaSources[0].TranscodingUrl){
            resolve(this.jellyfinApi.getApi().basePath + playbackInfo.MediaSources[0].TranscodingUrl); 
          }else{
            
            let directOptions: Record<string, string> = {
              Static: String(true),
              mediaSourceId: this.playingMedia.id,
              deviceId: this.jellyfinApi.getJellyfin().deviceInfo.id,
              api_key: this.jellyfinApi.getUser().AccessToken
            };
      
            const parameters = new URLSearchParams(directOptions).toString();
            resolve(`${this.jellyfinApi.getApi().basePath}/Videos/${this.playingMedia.id}/stream.mp4?${parameters}`); 
          }
        })
      });
      };
}