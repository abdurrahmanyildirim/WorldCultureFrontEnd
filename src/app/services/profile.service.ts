import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProfileUser } from '../models/profileUser';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private httpClient: HttpClient,
    private authService: AuthService
  ) { }

  baseUrl: string = "https://localhost:44303/api/";

  getUserData(userId): Observable<ProfileUser> {
    return this.httpClient.get<ProfileUser>(this.baseUrl + "profile/" + userId);
  }

  getRelationStatus(userId): Observable<boolean> {
    return this.httpClient.get<boolean>(this.baseUrl + "isFollower/" + userId, { headers: this.authService.headers });
  }

  changeToRelationStatus(userId) {
    return this.httpClient
      .get(this.baseUrl + "changeToRelationStatus/" + userId, { headers: this.authService.headers });
  }
}
