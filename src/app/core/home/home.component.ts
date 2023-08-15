import { Component, OnInit } from '@angular/core';
import { JellyfinAPIService } from 'src/app/services/jellyfin-api.service';
import { JellyfinService } from 'src/app/services/jellyfin.service';

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

  constructor(public jellyfinService: JellyfinService, public JellyfinApi: JellyfinAPIService ) { 
  }

  async ngOnInit() {
    // this.jellyfinService.getToFollow().subscribe();
    // this.jellyfinService.retakeViewing().subscribe();
    await this.JellyfinApi.getToFollow();
  }

}
