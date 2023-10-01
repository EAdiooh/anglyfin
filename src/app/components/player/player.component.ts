import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { JellyfinService } from 'src/app/services/jellyfin.service';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { JellyfinAPIService } from 'src/app/services/jellyfin-api.service';
import { Media } from 'src/app/classes/media.class';
import { PlayerService } from 'src/app/services/player.service';
import { getMediaInfoApi } from '@jellyfin/sdk/lib/utils/api/media-info-api';
import { VgApiService } from '@videogular/ngx-videogular/core';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent {

  public playbackURL:string = '';
  private api!: VgApiService;
 
  constructor(public jellyfinService: JellyfinService, private router: Router, private route: ActivatedRoute, public playerService: PlayerService) { 
  }

  ngOnInit() {
    this.play();
  }

  public async play(){
    this.playbackURL = await this.playerService.getItemPlaybackUrl();
  }

  public onPlayerReady(api: VgApiService){
    this.api = api;
    this.api.getDefaultMedia().subscriptions.loadedMetadata.subscribe(
      this.playVideo.bind(this)
    );
  }

  public playVideo(){
    this.api.play();
    if(this.playerService.playingMedia.userData.PlaybackPositionTicks > 0){
      this.api.getDefaultMedia().currentTime = (this.playerService.playingMedia.userData.PlaybackPositionTicks/10000000);
    }
  }
}
