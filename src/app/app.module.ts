import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServerComponent } from './core/server/server.component';

import { PrimeNGConfig } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { MessagesModule } from 'primeng/messages';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputMaskModule } from 'primeng/inputmask';
import { ProgressBarModule } from 'primeng/progressbar';
import { LoginComponent } from './core/login/login.component';
import { HomeComponent } from './core/home/home.component';
import { MovieCardComponent } from './components/movie-card/movie-card.component';
import { SerieEpisodeCardComponent } from './components/serie-episode-card/serie-episode-card.component';
import { PlayerComponent } from './components/player/player.component';

import {VgCoreModule} from '@videogular/ngx-videogular/core';
import {VgControlsModule} from '@videogular/ngx-videogular/controls';
import {VgOverlayPlayModule} from '@videogular/ngx-videogular/overlay-play';
import {VgBufferingModule} from '@videogular/ngx-videogular/buffering';
import {VgStreamingModule} from '@videogular/ngx-videogular/streaming';
@NgModule({
  declarations: [
    AppComponent,
    ServerComponent,
    LoginComponent,
    HomeComponent,
    MovieCardComponent,
    SerieEpisodeCardComponent,
    PlayerComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    InputTextModule,
    AppRoutingModule,
    HttpClientModule,
    MessagesModule,
    ToastModule,
    ButtonModule,
    InputMaskModule,
    ProgressBarModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
    VgStreamingModule
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
