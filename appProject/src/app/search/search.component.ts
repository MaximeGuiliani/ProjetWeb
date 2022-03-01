import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as e from 'express';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  streamerName: string = '';
  searchForm: FormGroup;
  dataReceive: boolean = false;
  image: string = '';
  display_name: string = '';
  description: string = '';
  view_count: string = '';
  broadcaster_type: boolean = true;

  constructor(private router: Router, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.searchForm = this.formBuilder.group({
      streamerName: ['', Validators.required],
    });
  }

  async onSubmit() {
    console.log('hello');
    console.log(this.streamerName);
    let response = await fetch(
      `https://api.twitch.tv/helix/users?login=` + this.streamerName,
      {
        headers: {
          Authorization: 'Bearer qlfl3pn71knxrtkdxpgir2b5uyo60o',
          'Client-Id': 'aosplncjpldwrjdnzf9lys3gzdt98v',
        },
      }
    );
    let user = await response.json();
    console.log(user);
    this.dataReceive = true;
    if (user['data']['length'] > 0) {
      this.display_name = user['data'][0]['display_name'];
      this.image = user['data'][0]['profile_image_url'];
      if (user['data'][0]['broadcaster_type'] === 'partner') {
        this.broadcaster_type = true;
      } else {
        this.broadcaster_type = false;
      }
      console.log(this.broadcaster_type);

      this.description = user['data'][0]['description'];

      this.view_count = user['data'][0]['view_count'];
    } else {
      this.image =
        'https://user-images.githubusercontent.com/24848110/33519396-7e56363c-d79d-11e7-969b-09782f5ccbab.png';
    }
    console.log(this.image);
  }
}
