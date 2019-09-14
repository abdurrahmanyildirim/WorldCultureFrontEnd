import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SearchComponent } from '../search/search.component';
import { Roles } from '../models/roles.enum';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [SearchComponent]
})
export class HeaderComponent implements OnInit {

  constructor(private authService: AuthService) { }

  accountID: number;
  key: string;

  ngOnInit() {
    if (this.isAuthenticate) {
      this.accountID = this.authService.getCurrentAccountId();
    }
  }

  fillCurrentId() {
    this.accountID = this.authService.getCurrentAccountId();
  }

  get isAuthenticate() {
    return this.authService.loggedIn();
  }

  get checkRole() {
    if(this.isAuthenticate){
      if (this.authService.getCurrentAccountRole() == Roles.A) {
        return true;
      }else{
        return false;
      }
    }else{
      return false
    }  
  }

  logOut() {
    this.authService.logOut();
  }

}
