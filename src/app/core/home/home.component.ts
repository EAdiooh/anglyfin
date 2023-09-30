import { Component, OnInit } from '@angular/core';
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

}
