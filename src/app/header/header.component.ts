import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private authService: AuthService) { }

  accountID: number;

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

  logOut() {
    this.authService.logOut();
  }

}
