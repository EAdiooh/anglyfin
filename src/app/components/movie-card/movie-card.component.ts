import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from 'src/app/classes/media.class';
import { JellyfinService } from 'src/app/services/jellyfin.service';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent {
  @Input() movie!: Movie;

  constructor(public jellyfinService: JellyfinService, private router: Router) { 
  }

  public play(){
    this.router.navigate(['play', { id: this.movie.id }]);
  }

  
  public getTimeRest(): number{
    return Math.floor((((this.movie.runTimeTicks/10000000)/60) - ((this.movie.userData.PlaybackPositionTicks/10000000)/60)))
  }
}
