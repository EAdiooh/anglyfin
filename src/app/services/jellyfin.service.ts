import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { User } from '../classes/user.class';
import { Server } from '../classes/server.class';
import { Session } from '../classes/session.class';
import { Media, Movie, SerieEpisode } from '../classes/media.class';
import {DomSanitizer} from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class JellyfinService {

    private user!: User;
    private server!: Server;
    private session!: Session;
    private headers: HttpHeaders = new HttpHeaders();
    private accessToken !: string;

    public toFollow: SerieEpisode[] = [];
    public conitnue: Media[] = [];
    
    constructor(private http: HttpClient, private messageService: MessageService, private sanitizer: DomSanitizer) { }

    public createInstance(userData: any, serverAddress: string, serverId: string, sessionInfo: any, accessToken:string){
      this.user = new User(userData);
      this.server = new Server(serverAddress, serverId);
      this.session = new Session(sessionInfo);
      this.accessToken = accessToken;
      this.headers = new HttpHeaders().set('X-Emby-Authorization', `Emby UserId="${this.user.getName()}", Client="media_cleaner", Device="media_cleaner", DeviceId="media_cleaner", Version="0.2", Token="${this.accessToken}"`);
    }

    public getServerAddress(): string{
      return this.server.getAddress();
    }


    getToFollow(): Observable<any>{
      let params = new HttpParams().set('userId', this.user.getId())
      return this.http.get<any>(`${this.server.getAddress()}/Shows/NextUp`, {headers: this.headers, params: params})
      .pipe(
        map( result => { 
          console.log(result)
          result.Items.forEach((item: any) => {
            this.toFollow.push(new SerieEpisode(item));
          });
       }),
        catchError(this.handleError<boolean>('connectToServer', false))
      );
    }

    public getSerieImage(seriesId: string): string{
      return `${this.server.getAddress()}/Items/${seriesId}/Images/Backdrop?fillHeight=300&fillWidth=355&quality=96`
    }

    retakeViewing(): Observable<any>{
      let params = new HttpParams().set('MediaTypes', 'Video');
      return this.http.get<any>(`${this.server.getAddress()}/Users/${this.user.getId()}/Items/Resume`, {headers: this.headers, params: params})
      .pipe(
        map( result => {
          result.Items.forEach((item: any) => {
            if(item.Type === "Movie"){ 
              this.conitnue.push(new Movie(item));
            }else if(item.Type === "Episode"){
              this.conitnue.push(new SerieEpisode(item));
            }
          });
       }),
        catchError(this.handleError<boolean>('connectToServer', false))
      );
    }

    public getplayMediaInfo(id: string){
      let params = new HttpParams().set('UserId', this.user.getId());
      return this.http.get<any>(`${this.server.getAddress()}/Items/${id}/PlaybackInfo`, {headers: this.headers, params: params})
      .pipe(
        map( result => {
          console.log(result);
       }),
        catchError(this.handleError<boolean>('connectToServer', false))
      );
    }


    public playMedia(id: string): Observable<string>{
      return this.http.get<string>(`${this.server.getAddress()}/Videos/d042d6cd54b9e03f9c5ad71dcebffddb/stream.mkv`, {headers: this.headers})
      .pipe(
        map( result => {
          console.log(result)
         return result
       }),
        catchError(this.handleError<string>('connectToServer', 'Errir loading video'))
      );
    }

    
    /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
    private handleError<T>(operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {

        // TODO: send the error to remote logging infrastructure
        console.error(error); // log to console instead

        // TODO: better job of transforming error for user consumption
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error' });

        // Let the app keep running by returning an empty result.
        return of(result as T);
      };
    }
  }