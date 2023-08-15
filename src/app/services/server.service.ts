import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { JellyfinService } from './jellyfin.service';

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  private headers: HttpHeaders = new HttpHeaders();
  private connectedServerAddress: string = '';

  constructor(private http: HttpClient, private messageService: MessageService, private jellyfinService: JellyfinService) { }

  public setServer(serverAddress: string){
    this.connectedServerAddress = serverAddress;
  }

  public getServer(){
    return this.connectedServerAddress;
  }
  public checkServerExist(serverUrl: string): Observable<boolean> {
    return this.http.get<boolean>(`${serverUrl}/system/ping`)
      .pipe(
        map( result => { 
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Server found!' });
          return true;
       }),
        catchError(this.handleError<boolean>('connectToServer', false))
      );
  }

  public login(username: string, password: string): Observable<boolean> {
    this.headers= new HttpHeaders().set('X-Emby-Authorization', `Emby UserId="${username}", Client="media_cleaner", Device="media_cleaner", DeviceId="media_cleaner", Version="0.2", Token=""`);
    return this.http.post<any>(`${this.connectedServerAddress}/Users/AuthenticateByName`, {Username: username, Pw: password}, {headers: this.headers})
      .pipe(
        map( result => {
          this.jellyfinService.createInstance(result.User, this.connectedServerAddress, result.ServerId, result.SessionInfo, result.AccessToken)
          return true;
       }),
        catchError(this.handleError<boolean>('connectToServer', false))
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
