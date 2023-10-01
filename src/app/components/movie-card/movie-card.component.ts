import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from 'src/app/classes/media.class';
import { JellyfinAPIService } from 'src/app/services/jellyfin-api.service';
import {
  ImageType
} from '@jellyfin/sdk/lib/generated-client';
import { PlayerService } from 'src/app/services/player.service';
@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent {
  @Input() movie!: Movie;
  public img_url: string = '';

  constructor (public jellyfinApi: JellyfinAPIService, private router: Router, private playerService: PlayerService) { 
  }

  ngOnInit() {
    this.img_url = this.jellyfinApi.getImage(this.movie.id, ImageType.Backdrop)
  }

  public play(){
    this.playerService.play(this.movie);
  }

  
  public getTimeRest(): number{
    return Math.floor((((this.movie.runTimeTicks/10000000)/60) - ((this.movie.userData.PlaybackPositionTicks/10000000)/60)))
  }
}
