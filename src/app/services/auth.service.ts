import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginUser } from '../models/loginUser';
import { JwtHelper, tokenNotExpired } from 'angular2-jwt';
import { Router } from '@angular/router';
import { RegisterUser } from '../models/registerUser';
import { AlertifyService } from './alertify.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private alertifyService:AlertifyService
  ) { }

  baseUrl: string = "https://localhost:44303/api/auth/";
  userToken: any;
  decodenToken: any;
  jwtHelper: JwtHelper = new JwtHelper();
  TOKEN_KEY = "token";

  login(loginUser: LoginUser) {
    let headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json");
    this.httpClient
      .post(this.baseUrl + "Login", loginUser, { headers: headers})
      .subscribe(data => {
        this.saveToken(data);
        this.userToken = data;
        this.decodenToken = this.jwtHelper.decodeToken(data.toString());
        this.alertifyService.success("Giriş yapıldı.")
        this.router.navigateByUrl('/countries');
      })
  }

  register(registerUser: RegisterUser) {
    let headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json");
    this.httpClient
      .post(this.baseUrl + "register", registerUser, { headers: headers })
      .subscribe(data => {
        this.alertifyService.success("Üyelik işlemi başarılı. Giriş yapabilirsiniz.")
        this.router.navigateByUrl('/login');
      })
  }

  get headers(){
    let headers=new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
    headers = headers.append("Content-Type","application/json");
    return headers;
  }

  saveToken(token) {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  logOut(){
    localStorage.removeItem(this.TOKEN_KEY);
    this.alertifyService.error("Çıkış yapıldı.")
  }

  loggedIn(){
    //Token olup olmadığı kontrol ediyor.
    return tokenNotExpired(this.TOKEN_KEY);
  }

  get token(){
    return localStorage.getItem(this.TOKEN_KEY);
  }

  getCurrentAccountId(){
    return this.jwtHelper.decodeToken(this.token).nameid
  }
}
