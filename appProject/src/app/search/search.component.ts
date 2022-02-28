import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  @Input() streamerName!: string;
  searchForm!: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private http: HttpClient
  ) {}
  url =
    "curl -X GET 'https://api.twitch.tv/helix/users?login=gotaga'-H 'Authorization: Bearer qlfl3pn71knxrtkdxpgir2b5uyo60o'-H 'Client-Id: aosplncjpldwrjdnzf9lys3gzdt98v'";

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.searchForm = this.formBuilder.group({
      streamerName: [''],
    });
  }

  async onSubmit() {
    console.log('hello');
    console.log(this.streamerName);
    let response = await fetch(
      `https://api.twitch.tv/helix/users?login=gotaga`,
      {
        headers: {
          Authorization: 'Bearer qlfl3pn71knxrtkdxpgir2b5uyo60o',
          'Client-Id': 'aosplncjpldwrjdnzf9lys3gzdt98v',
        },
      }
    );
    let user = await response.json();
    console.log(user);
    return user;
  }

  ngSubmit() {
    this.router.navigate(['auth']);
  }
}
