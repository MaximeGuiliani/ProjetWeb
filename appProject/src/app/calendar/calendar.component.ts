import { Component, Input, OnInit } from '@angular/core';
import Calendar, { ICalendarInfo } from 'tui-calendar';
import 'tui-calendar/dist/tui-calendar.css';

import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {
  constructor(private route: ActivatedRoute) {}
  private routeSub: Subscription;

  @Input() streamerName: string;
  @Input() id: string;
  calendarstreamer: any;

  async ngOnInit(): Promise<void> {
    this.routeSub = this.route.params.subscribe((params) => {
      this.id = params['id'];
    });
    // TODO : Modifier pour ne pas faire une requete
    let response2 = await fetch(
      'https://api.twitch.tv/helix/channels?broadcaster_id=' + this.id,
      {
        headers: {
          Authorization: 'Bearer qlfl3pn71knxrtkdxpgir2b5uyo60o',
          'Client-Id': 'aosplncjpldwrjdnzf9lys3gzdt98v',
        },
      }
    );
    let response = await fetch(
      'https://api.twitch.tv/helix/schedule?broadcaster_id=' + this.id,
      {
        headers: {
          Authorization: 'Bearer qlfl3pn71knxrtkdxpgir2b5uyo60o',
          'Client-Id': 'aosplncjpldwrjdnzf9lys3gzdt98v',
        },
      }
    );
    let user = await response2.json();
    this.streamerName = user['data'][0]['broadcaster_name'];
    let calendar = await response.json();
    console.log(' icalendar ' + calendar);
    this.calendarstreamer = calendar;
    this.setCalendar();
  }

  async setCalendar() {
    var calendartemplate = new Calendar('#calendar', {
      defaultView: 'week',
      isReadOnly: true,
      useDetailPopup: true,
      taskView: false,
      scheduleView: ['time'],
    });
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }
}
