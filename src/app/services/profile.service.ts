import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProfileUser } from '../models/profileUser';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private httpClient: HttpClient) { }

  baseUrl: string = "https://localhost:44303/api/";

  getUserData(userId): Observable<ProfileUser> {
    return this.httpClient.get<ProfileUser>(this.baseUrl + "profile/" + userId);
  }

}
