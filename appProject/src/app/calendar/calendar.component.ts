import { Component, Input, OnInit } from '@angular/core';
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

  async ngOnInit() {
    this.routeSub = this.route.params.subscribe((params) => {
      this.id = params['id'];
    });
    // TODO : Modifier pour ne pas faire une requete
    let responseForId = await fetch(
      'https://api.twitch.tv/helix/channels?broadcaster_id=' + this.id,
      {
        headers: {
          Authorization: 'Bearer qlfl3pn71knxrtkdxpgir2b5uyo60o',
          'Client-Id': 'aosplncjpldwrjdnzf9lys3gzdt98v',
        },
      }
    );
    let responseForCalendar = await fetch(
      'https://api.twitch.tv/helix/schedule?broadcaster_id=' + this.id,
      {
        headers: {
          Authorization: 'Bearer qlfl3pn71knxrtkdxpgir2b5uyo60o',
          'Client-Id': 'aosplncjpldwrjdnzf9lys3gzdt98v',
        },
      }
    );
    let user = await responseForId.json();
    this.streamerName = user['data'][0]['broadcaster_name'];
    let calendarData = await responseForCalendar.json();

    this.calendarstreamer = calendarData;
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }
}
