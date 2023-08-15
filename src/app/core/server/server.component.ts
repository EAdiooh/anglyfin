import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { server } from 'src/app/models/server.interface';
import { JellyfinAPIService } from 'src/app/services/jellyfin-api.service';
import { ServerService } from 'src/app/services/server.service';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.scss']
})
export class ServerComponent {
  //http://192.168.1.62:8096/'http://192.168.1.62:8096/'
  constructor(private serverService: ServerService, private router: Router, private JellyfinApi: JellyfinAPIService) { }

  public serversList: server[] = [{name: 'Home', address: 'http://192.168.1.62:8096'}, {name: 'Home2', address: 'http://192.168.1.62:8096'}];
  public server:server = {name: '', address: ''};
  public showServerList: boolean = true;

  public async checkServerExist(){
    // this.serverService.checkServerExist(this.server.address).subscribe(
    //   () => {
    //     this.serversList.push(this.server);
    //     this.server = {name: '', address: ''};
    //     this.showServerList = true;
    //   }
    // );
  }

  public async connectToServer(address: string){
    // this.serverService.setServer(address);
    // this.router.navigate(['login'],);
    try {
      await this.JellyfinApi.connectToServer(address);
      this.router.navigate(['login']);
    } catch (error) {
      console.warn(error);
    }
  }
}
