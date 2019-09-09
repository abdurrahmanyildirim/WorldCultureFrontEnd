import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SearchComponent } from '../search/search.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers:[SearchComponent]
})
export class HeaderComponent implements OnInit {

  constructor(private authService: AuthService,
    private router:Router,
    private searchComponent:SearchComponent,
    private activatedRoute:ActivatedRoute) { }

  accountID: number;
  key:string;

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
