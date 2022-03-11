import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { StreamerService } from '../services/streamer.service';

@Component({
  selector: 'app-list-calendar',
  templateUrl: './list-calendar.component.html',
  styleUrls: ['./list-calendar.component.scss'],
})
export class ListCalendarComponent implements OnInit {
  streamerId: any;
  constructor(private streamerService: StreamerService) {}
  streamers = [];
  streamersSubscription: Subscription;
  listCalendar = [];

  async ngOnInit(): Promise<void> {
    this.streamersSubscription =
      this.streamerService.streamersSubject.subscribe((streamers: any[]) => {
        this.streamers = streamers;
      });
    this.streamerService.emitStreamerSubject();

    for (let i = 0; i < this.streamers.length; i++) {
      let name = this.streamers[i].streamerName;
      let response = await fetch(
        'https://api.twitch.tv/helix/users?login=' + name,
        {
          headers: {
            Authorization: 'Bearer qlfl3pn71knxrtkdxpgir2b5uyo60o',
            'Client-Id': 'aosplncjpldwrjdnzf9lys3gzdt98v',
          },
        }
      );
      let user = await response.json();
      this.streamerId = user['data'][0]['id'];
      let responseForCalendar = await fetch(
        'https://api.twitch.tv/helix/schedule?broadcaster_id=' +
          this.streamerId,
        {
          headers: {
            Authorization: 'Bearer qlfl3pn71knxrtkdxpgir2b5uyo60o',
            'Client-Id': 'aosplncjpldwrjdnzf9lys3gzdt98v',
          },
        }
      );
      let calendarData = await responseForCalendar.json();
      this.listCalendar.push(calendarData);
    }
    console.log(this.listCalendar);
  }
}
