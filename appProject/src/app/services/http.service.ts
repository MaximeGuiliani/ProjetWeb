import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Streamer } from '../model/streamer.model';
@Injectable({ providedIn: 'root' })
export class HttpService {
  private serverUrl = 'http://localhost:8080/';
  constructor(private http: HttpClient) {}

  public getStreamers(): Observable<any> {
    return this.http.get(this.serverUrl + 'followed');
  }
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  addStreamer(streamer: Streamer): Observable<Streamer> {
    return this.http.post<Streamer>(
      this.serverUrl + 'followed',
      streamer,
      this.httpOptions
    );
  }

  public deleteStreamer(streamerName: String): Observable<any> {
    return this.http.delete<any>(this.serverUrl + 'followed/' + streamerName, {
      observe: 'response',
    });
  }
}
