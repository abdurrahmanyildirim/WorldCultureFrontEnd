import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProfileUser } from '../models/profileUser';
import { PublicSettingUser } from '../models/publicSettingUser';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(
    private httpClient: HttpClient
  ) { }

  baseUrl: string = environment.path + "/api/";

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
      .get<boolean>(this.baseUrl + "isFollower/" + userId);
  }

  changeToRelationStatus(userId) {
    return this.httpClient
      .get(this.baseUrl + "changeToRelationStatus/" + userId);
  }

  changePassword(password: any) {
    return this.httpClient
      .put(this.baseUrl + "changePassword", password);
  }

  changePublicSettings(publicSettings: any) {
    return this.httpClient
      .put("profile/changePublicInfo", publicSettings);
  }

  getPublicSettings(): Observable<PublicSettingUser> {
    return this.httpClient
      .get<PublicSettingUser>(this.baseUrl + "profile/getPublicInfo");
  }

  getMostFollowerAccounts(): Observable<ProfileUser[]> {
    return this.httpClient.get<ProfileUser[]>(this.baseUrl + "profile/most-follower-accounts");
  }

  getSearch(key): Observable<ProfileUser[]> {
    return this.httpClient.get<ProfileUser[]>(this.baseUrl + "profile/search?key=" + key);
  }
}
