import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../services/profile.service';
import { ProfileUser } from '../models/profileUser';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private profileService: ProfileService,
    private activatedRoute: ActivatedRoute
  ) { }

  account: ProfileUser;

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.getAccountData(params["accountID"]);
    })
  }

  getAccountData(userId) {
    this.profileService.getUserData(userId).subscribe(data => {
      this.account = data;
    })
  }

}
