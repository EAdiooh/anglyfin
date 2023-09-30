import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { JellyfinService } from 'src/app/services/jellyfin.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { JellyfinAPIService } from 'src/app/services/jellyfin-api.service';
import { Media } from 'src/app/classes/media.class';
import { PlayerService } from 'src/app/services/player.service';
import { getMediaInfoApi } from '@jellyfin/sdk/lib/utils/api/media-info-api';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent {

  public playbackURL:string = '';
 
  constructor(public jellyfinService: JellyfinService, private router: Router, private route: ActivatedRoute, public playerService: PlayerService) { 
  }

  ngOnInit() {
    this.play();
  }

  public async play(){
    this.playbackURL = await this.playerService.getItemPlaybackUrl();
  }
}
