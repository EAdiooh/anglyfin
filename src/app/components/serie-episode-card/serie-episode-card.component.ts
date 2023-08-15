import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { SerieEpisode } from 'src/app/classes/media.class';
import { JellyfinAPIService } from 'src/app/services/jellyfin-api.service';
import { JellyfinService } from 'src/app/services/jellyfin.service';
import {
  ImageType
} from '@jellyfin/sdk/lib/generated-client';
@Component({
  selector: 'app-serie-episode-card',
  templateUrl: './serie-episode-card.component.html',
  styleUrls: ['./serie-episode-card.component.scss']
})
export class SerieEpisodeCardComponent {
  @Input() episode!: SerieEpisode;
  public img_url: string = '';

  constructor(public jellyfinService: JellyfinService, private router: Router, public jellyfinApi: JellyfinAPIService) { 
    
  }

  ngOnInit() {
    this.img_url = this.jellyfinApi.getImage(this.episode.seriesId, ImageType.Backdrop)
  }

  public play(){
    this.router.navigate(['play', { media: this.episode }]);
  }
}
