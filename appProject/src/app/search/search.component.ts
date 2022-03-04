import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  searchForm: FormGroup;
  dataReceive: boolean = false;
  streamerProfileImage: string;
  streamerName: string;
  streamerDescription: string;
  streamerViewCount: string;
  isPartner: boolean;
  isFound: boolean;
  streamerNotFoundImage: string = 'https://mir-s3-cdn-cf.behance.net/project_modules/1400_opt_1/8e2f5370244303.5b9d01a5d7cd5.gif';

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
    let response = await fetch(
      'https://api.twitch.tv/helix/users?login=' +
        this.searchForm.value.streamerName,
      {
        headers: {
          Authorization: 'Bearer qlfl3pn71knxrtkdxpgir2b5uyo60o',
          'Client-Id': 'aosplncjpldwrjdnzf9lys3gzdt98v',
        },
      }
    );
    let user = await response.json();
    this.dataReceive = true;
    if (user['data']['length'] > 0) {
      this.isFound = true;
      this.streamerName = user['data'][0]['display_name'];
      this.streamerProfileImage = user['data'][0]['profile_image_url'];
      if (user['data'][0]['broadcaster_type'] === 'partner') {
        this.isPartner = true;
      } else {
        this.isPartner = false;
      }
      this.streamerDescription = user['data'][0]['description'];

      this.streamerViewCount = user['data'][0]['view_count'];
    } else {
      this.isFound = false;
    }
  }
}
