import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProfileUser } from '../models/profileUser';
import { Relation } from '../models/relation';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private httpClient: HttpClient,
    private router: Router,
    private authService: AuthService
  ) { }

  baseUrl: string = "https://localhost:44303/api/";

  getUserData(userId): Observable<ProfileUser> {
    return this.httpClient.get<ProfileUser>(this.baseUrl + "profile/" + userId);
  }

  getRelationStatus(userId): Observable<boolean> {
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.authService.token);
    return this.httpClient.get<boolean>(this.baseUrl + "isFollower/" + userId,{headers:headers});
  }

  changeToRelationStatus(userId) {
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.authService.token);
    return this.httpClient
      .post(this.baseUrl + "changeToRelationStatus/" + userId, { headers: headers })
      .subscribe(data => {
        this.router.navigateByUrl('profile/' + userId);
      });
  }
}
