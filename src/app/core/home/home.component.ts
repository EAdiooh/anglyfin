import { Component, OnInit } from '@angular/core';
import { Media, Movie, SerieEpisode } from 'src/app/classes/media.class';
import { JellyfinAPIService } from 'src/app/services/jellyfin-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

  public responsiveOptions = [
    {
        breakpoint: '1199px',
        numVisible: 1,
        numScroll: 1
    },
    {
        breakpoint: '991px',
        numVisible: 2,
        numScroll: 1
    },
    {
        breakpoint: '767px',
        numVisible: 1,
        numScroll: 1
    }
  ];

  constructor(public JellyfinApi: JellyfinAPIService ) { 
  }

  async ngOnInit() {
    await this.JellyfinApi.getToFollow();
  }

  public getType(media: Media): string{
    if(media instanceof SerieEpisode){
      return 'episode';
    }

    if(media instanceof Movie){
      return 'movie';
    }

    return '';
  }

  public returnSerieEpisode(media: Media): SerieEpisode{
    return media as SerieEpisode;
  }

  public returnMovie(media: Media): Movie{
    return media as Movie;
  }

}
