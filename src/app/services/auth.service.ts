import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginUser } from '../models/loginUser';
import { JwtHelper, tokenNotExpired } from 'angular2-jwt';
import { RegisterUser } from '../models/registerUser';
import { AlertifyService } from './alertify.service';
import { environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private httpClient: HttpClient,
    private alertifyService: AlertifyService
  ) { }

  baseUrl: string = environment.path + "/api/auth/";
  jwtHelper: JwtHelper = new JwtHelper();
  TOKEN_KEY = "token";

  login(loginUser: LoginUser): any {
    let headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json");
    return this.httpClient
      .post<any>(this.baseUrl + "Login", loginUser, { headers: headers });
  }

  register(registerUser: RegisterUser): any {
    let headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json");
    return this.httpClient
      .post<any>(this.baseUrl + "register", registerUser, { headers: headers });
  }

  get headers() {
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
    headers = headers.append("Content-Type", "application/json");
    return headers;
  }

  saveToken(token) {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  logOut() {
    localStorage.removeItem(this.TOKEN_KEY);
    this.alertifyService.error("Çıkış yapıldı.")
  }

  loggedIn() {
    //Token olup olmadığı kontrol ediyor.
    return tokenNotExpired(this.TOKEN_KEY);
  }

  get token() {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  getCurrentAccountRole(){
    return this.jwtHelper.decodeToken(this.token).role;
  }

  getCurrentAccountId() {
    return this.jwtHelper.decodeToken(this.token).nameid
  }
}
