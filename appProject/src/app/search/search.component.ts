import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
    this.image = user['data'][0]['profile_image_url'];
  }

  ngSubmit() {
    this.router.navigate(['auth']);
  }
}
