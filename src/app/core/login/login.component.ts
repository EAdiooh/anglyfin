import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { JellyfinAPIService } from 'src/app/services/jellyfin-api.service';
import { ServerService } from 'src/app/services/server.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private serverService: ServerService, private router: Router, private messageService: MessageService, private JellyfinApi: JellyfinAPIService) { 
    // if(this.serverService.getServer() === ''){
    //   this.router.navigate(['']);
    // }
  }

  public user: {username: string, password: string} = {username: '', password: ''};

  public async login(){
    if(this.user.username === '' || this.user.password === ''){
      this.messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Enter a username and a password!' });
      return;
    }

    try {
      await this.JellyfinApi.login(this.user.username, this.user.password);
      this.router.navigate(['home']);
    } catch (error) {
      console.warn(error);
    }

    // this.serverService.login(this.user.username, this.user.password).subscribe(
    //   () => {
    //     this.router.navigate(['home']);
    //   }
    // );
  }

}
