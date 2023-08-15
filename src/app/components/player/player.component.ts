import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { JellyfinService } from 'src/app/services/jellyfin.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { JellyfinAPIService } from 'src/app/services/jellyfin-api.service';


@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent {

  private mediaId!: string;
 
  constructor(public jellyfinService: JellyfinService, private router: Router, private route: ActivatedRoute, public jellyfinApi: JellyfinAPIService) { 
    this.mediaId = this.route.snapshot.paramMap.get('id') ?? '';
  }

  ngOnInit() {
    this.play();
  }

  public play(){
    
  }
}
