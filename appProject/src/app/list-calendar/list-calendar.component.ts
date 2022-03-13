import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-list-calendar',
  templateUrl: './list-calendar.component.html',
  styleUrls: ['./list-calendar.component.scss'],
})
export class ListCalendarComponent implements OnInit {
  streamerId: any;
  finalCalendar = [];
  constructor(private httpService: HttpService) {}
  streamers = [];
  streamersSubscription: Subscription;
  listCalendar = [];
  selected: boolean;
  color = [
    'primary',
    'secondary',
    'success',
    'danger',
    'warning',
    'info',
    'light',
    'dark',
  ];

  async ngOnInit(): Promise<void> {
    this.streamersSubscription = this.httpService
      .getStreamers()
      .subscribe((streamers: any[]) => {
        this.streamers = streamers;
        this.next();
      });
  }
  async next() {
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
      if (calendarData.error !== 'Not Found') {
        this.listCalendar.push(calendarData);
      }
    }
    this.create_sorted_list();
  }

  create_sorted_list() {
    let total = 0;
    let listPosition = [];
    for (let i = 0; i < this.listCalendar.length; i++) {
      total += this.listCalendar[i].data.segments.length;
      listPosition.push({
        currentPos: 0,
        maxPos: this.listCalendar[i].data.segments.length,
      });
    }

    for (let i = 0; i < total; i++) {
      let min = new Date().setFullYear(5000, 11, 3);
      let calendarValue = this.listCalendar;
      let streamer = '';
      let minPos: number;

      for (let i = 0; i < calendarValue.length; i++) {
        if (listPosition[i].currentPos < listPosition[i].maxPos) {
          if (
            new Date(min).getTime() -
              new Date(
                calendarValue[i].data.segments[
                  listPosition[i].currentPos
                ].start_time
              ).getTime() >
            0
          ) {
            min = new Date(
              calendarValue[i].data.segments[
                listPosition[i].currentPos
              ].start_time
            ).getTime();
            minPos = i;
            streamer = calendarValue[i].data.broadcaster_name;
          }
        }

        var localValue = {
          streamerName: streamer,
          start:
            calendarValue[minPos].data.segments[listPosition[minPos].currentPos]
              .start_time,
          title:
            calendarValue[minPos].data.segments[listPosition[minPos].currentPos]
              .title,
          category:
            calendarValue[minPos].data.segments[listPosition[minPos].currentPos]
              .category.name,
          id: minPos,
        };
      }
      listPosition[minPos].currentPos += 1;
      this.finalCalendar.push(localValue);
    }
  }
}
