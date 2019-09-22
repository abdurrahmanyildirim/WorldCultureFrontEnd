import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AlertifyService } from '../services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(
    private authService:AuthService,
    private alertifyService:AlertifyService,
    private router:Router
    ) { }

  loginUser:any={
    email:'',
    password:''
  };

  login(){
    this.authService.login(this.loginUser).subscribe(data => {
      this.authService.saveToken(data);
      // this.userToken = data;
      // this.decodenToken = this.jwtHelper.decodeToken(data.toString());
      this.alertifyService.success("Giriş yapıldı.")
      this.router.navigateByUrl('/countries');
    },
    err=>{
      this.alertifyService.error(err.error);
      this.loginUser.email=null;
      this.loginUser.password=null;
    });
  }

}
