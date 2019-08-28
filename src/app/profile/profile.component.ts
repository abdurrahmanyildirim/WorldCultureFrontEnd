import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../services/profile.service';
import { ProfileUser } from '../models/profileUser';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AlertifyService } from '../services/alertify.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private profileService: ProfileService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
    private alertifyService:AlertifyService
  ) { }

  account: ProfileUser;
  currentAccountId: number;
  isFollower: boolean = false;
  isMain: boolean = false;
  followButton: string = "Takip Et";
  routeId: number;

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.routeId = params["accountID"];
      this.getAccountData(params["accountID"]);
      if (this.isAuthenticate) {
        this.currentAccountId = this.authService.getCurrentAccountId();
        if (this.currentAccountId == params["accountID"]) {
          this.isMain = true;
        } else {
          this.profileService.getRelationStatus(this.routeId).subscribe(data => {
            this.isFollower = data;
            if (this.isFollower) {
              this.followButton = "Takipten Çık";
            }
          });
        }
      }
    });
  }

  changeToRelationStatus() {
    if (this.isAuthenticate) {
      this.profileService.changeToRelationStatus(this.routeId)
      .subscribe(data=>{
        this.router.navigateByUrl('/profile/' + this.routeId);
      });
      
      if(this.followButton==="Takip Et"){
        this.alertifyService.success("Takip ettiniz.")
      }else {
        this.alertifyService.error("Takipten çıktınız.")
      }

    } else {
      this.alertifyService.error("Sisteme giriş yapmalısınız.")
      this.router.navigateByUrl('/login');
    }
  }

  get isAuthenticate() {
    return this.authService.loggedIn();
  }

  getAccountData(userId) {
    this.profileService.getUserData(userId).subscribe(data => {
      this.account = data;
    })
  }

}
