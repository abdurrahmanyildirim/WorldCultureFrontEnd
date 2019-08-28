import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/services/profile.service';
import { ProfileUser } from 'src/app/models/profileUser';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from 'src/app/services/alertify.service';

@Component({
  selector: 'app-profile-relation',
  templateUrl: './profile-relation.component.html',
  styleUrls: ['./profile-relation.component.css']
})
export class ProfileRelationComponent implements OnInit {

  constructor(private profileService: ProfileService,
    private activatedRoute: ActivatedRoute,
    private alertifyService: AlertifyService) { }

  accounts: ProfileUser[];
  followers: ProfileUser[];
  followings: ProfileUser[];
  
  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.getFollowers(params["accountID"]);
      this.getFollowings(params["accountID"]);
      this.alertifyService.success("Takipçiler");
    })
  }

  showFollowers() {
    this.accounts = this.followers;
    this.alertifyService.success("Takipçiler");
  }

  showFollowings() {
    this.accounts = this.followings;
    this.alertifyService.success("Takip Edilenler");
  }

  getFollowers(userId) {
    this.profileService.getFollowers(userId).subscribe(data => {
      this.followers = data;
      this.accounts = data;
    })
  }

  getFollowings(userId) {
    this.profileService.getFollowings(userId).subscribe(data => {
      this.followings = data;
    })
  }

}
