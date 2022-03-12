import { Component, Input, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';
import { StreamerService } from '../services/streamer.service';

@Component({
  selector: 'app-streamer',
  templateUrl: './streamer.component.html',
  styleUrls: ['./streamer.component.scss'],
})
export class StreamerComponent implements OnInit {
  @Input() streamerName: string | undefined;
  @Input() streamerProfileImage: string | undefined;
  @Input() isPartner: boolean | undefined;
  @Input() id: number | undefined;

  constructor(
    private streamerService: StreamerService,
    private http: HttpService
  ) {}

  onSwitch() {
    this.streamerService.remove(this.id);
  }

  ngOnInit(): void {}
}
