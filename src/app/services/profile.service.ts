import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProfileUser } from '../models/profileUser';
import { AuthService } from './auth.service';
import { PublicSettingUser } from '../models/publicSettingUser';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private httpClient: HttpClient,
    private authService: AuthService
  ) { }

  baseUrl: string = "https://localhost:44303/api/";

  getFollowers(userId): Observable<ProfileUser[]> {
    return this.httpClient.get<ProfileUser[]>(this.baseUrl + "profile/followers/" + userId);
  }

  getFollowings(userId): Observable<ProfileUser[]> {
    return this.httpClient.get<ProfileUser[]>(this.baseUrl + "profile/followings/" + userId);
  }

  getUserData(userId): Observable<ProfileUser> {
    return this.httpClient.get<ProfileUser>(this.baseUrl + "profile/" + userId);
  }

  getRelationStatus(userId): Observable<boolean> {
    return this.httpClient
      .get<boolean>(this.baseUrl + "isFollower/" + userId, { headers: this.authService.headers });
  }

  changeToRelationStatus(userId) {
    return this.httpClient
      .get(this.baseUrl + "changeToRelationStatus/" + userId, { headers: this.authService.headers });
  }

  changePassword(password: any) {
    return this.httpClient
      .put(this.baseUrl + "changePassword", password, { headers: this.authService.headers });
  }

  changePublicSettings(publicSettings: any) {
    return this.httpClient
      .put("profile/changePublicInfo", publicSettings, { headers: this.authService.headers });
  }

  getPublicSettings(): Observable<PublicSettingUser> {
    return this.httpClient
      .get<PublicSettingUser>(this.baseUrl + "profile/getPublicInfo", { headers: this.authService.headers });
  }

  getMostFollowerAccounts(): Observable<ProfileUser[]> {
    return this.httpClient.get<ProfileUser[]>(this.baseUrl + "profile/most-follower-accounts");
  }

  getSearch(key): Observable<ProfileUser[]> {
    return this.httpClient.get<ProfileUser[]>(this.baseUrl + "profile/search?key=" + key);
  }
}
