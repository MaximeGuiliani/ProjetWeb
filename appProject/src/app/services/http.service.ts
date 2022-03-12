import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
@Injectable({ providedIn: 'root' })
export class HttpService {
  private serverUrl = 'http://localhost:8080/';
  constructor(private http: HttpClient) {}
  public getStreamers(): Observable<any> {
    return this.http.get(this.serverUrl + 'followed');
  }
  addStreamer(
    streamerName: string,
    streamerProfileImage: string,
    isPartner: boolean
  ): Observable<JSON> {
    return this.http.post<JSON>(this.serverUrl + 'followed', {
      streamerName: streamerName,
      isPartner: isPartner,
      streamerProfileImage: streamerProfileImage,
    });
  }
}
