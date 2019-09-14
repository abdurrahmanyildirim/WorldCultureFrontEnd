import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Roles } from '../models/roles.enum';
import { AlertifyService } from '../services/alertify.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

  constructor(
    private authService:AuthService,
    private router:Router,
    private alertifyService:AlertifyService
  ) { }

  countryPanel:boolean=true;
  cityPanel:boolean=false;
  ngOnInit() {
    if(this.authService.getCurrentAccountRole()!=Roles.A){
      this.alertifyService.error("Yetkisiz giriş tespit edildi!");
      this.router.navigateByUrl('/countries');
    }
  }

  showCountryPanel(){
    this.countryPanel=true;
    this.cityPanel=false;
  }

  showCityPanel(){
    this.cityPanel=true;
    this.countryPanel=false;
  }

}
