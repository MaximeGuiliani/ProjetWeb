import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Streamer } from '../model/streamer.model';

@Injectable()
export class StreamerService {
  private streamers = [
    new Streamer(
      'Maxime',
      false,
      'https://www.motorsinside.com/images/photo/article/f12022/ferrari-f1-75_jpg_sponsor_00001-sanslogo.jpg',
      'cdoe'
    ),
  ];
  streamersSubject = new Subject<any[]>();

  remove(id: number) {
    this.streamers.splice(id, 1);
    this.emitStreamerSubject();
  }

  get(streamerName: string) {
    const student = this.streamers.find((s) => {
      return s.streamerName === streamerName;
    });
    return student;
  }

  emitStreamerSubject() {
    this.streamersSubject.next(this.streamers.slice());
  }

  addStreamer(streamer: Streamer) {
    this.streamers.push(streamer);
    this.emitStreamerSubject();
  }
}
