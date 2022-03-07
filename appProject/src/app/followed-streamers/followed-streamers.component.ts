import { Component, OnInit } from '@angular/core';
import { StreamerService } from '../services/streamer.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-followed-streamers',
  templateUrl: './followed-streamers.component.html',
  styleUrls: ['./followed-streamers.component.scss']
})
export class FollowedStreamersComponent implements OnInit {

  constructor(private streamerService: StreamerService) { }

  streamers = [];
  streamersSubscription: Subscription;

  ngOnInit() {
    this.streamersSubscription = this.streamerService.streamersSubject.subscribe(
      (streamers: any[]) => {
        this.streamers = streamers;
      }
    );
    this.streamerService.emitStreamerSubject();
  }

  ngOnDestroy() {
    this.streamersSubscription.unsubscribe();
  }
}
