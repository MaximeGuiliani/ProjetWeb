import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-followed-streamers',
  templateUrl: './followed-streamers.component.html',
  styleUrls: ['./followed-streamers.component.scss'],
})
export class FollowedStreamersComponent implements OnInit {
  constructor(private http: HttpService) {}

  streamers = [];
  streamersSubscription: Subscription;

  ngOnInit() {
    this.streamersSubscription = this.http
      .getStreamers()
      .subscribe((streamers: any[]) => {
        this.streamers = streamers;
      });
  }

  ngOnDestroy() {
    this.streamersSubscription.unsubscribe();
  }

  deleteStreamer(streamerName: String) {
    this.http.deleteStreamer(streamerName).subscribe((result) => {
      if (result.status === 200) {
        console.log('ici');
        this.ngOnInit();
      } else {
        alert("Le streamer n'existe pas.");
      }
    });
  }
}
