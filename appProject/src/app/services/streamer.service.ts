import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class StreamerService {
  streamersSubject = new Subject<any[]>();
  private streamers = [
    {
      streamerName: 'Maxime0',
      streamerProfileImage:
        'https://www.motorsinside.com/images/photo/article/f12022/ferrari-f1-75_jpg_sponsor_00001-sanslogo.jpg',
      isPartner: false,
      id: 0,
    },
    {
      streamerName: 'Maxime1',
      streamerProfileImage:
        'https://www.monaco-tribune.com/wp-content/uploads/2022/02/scuderia-ferrari.jpeg',
      isPartner: false,
      id: 1,
    },
    {
      streamerName: 'Maxime2',
      streamerProfileImage:
        'https://static.lexpress.fr/medias_11761/w_1000,h_563,c_fill,g_north/v1519313107/la-sf71-h-presentee-par-l-ecurie-ferrari-le-22-fevrier-2018_6021998.jpg',
      isPartner: false,
      id: 2,
    },
  ];

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

  addStreamer(
    streamerName: string,
    streamerProfileImage: string,
    isPartner: boolean
  ) {
    const newStreamer = {
      streamerName: '',
      streamerProfileImage: '',
      isPartner: false,
      id: 0,
    };
    newStreamer.streamerName = streamerName;
    newStreamer.streamerProfileImage = streamerProfileImage;
    newStreamer.isPartner = isPartner;
    newStreamer.id = this.streamers[this.streamers.length - 1].id + 1;
    this.streamers.push(newStreamer);
    this.emitStreamerSubject();
  }
}
