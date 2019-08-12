import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { postForCard } from '../models/postForCard';
import { post } from '../models/post';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private httpClient: HttpClient,
  ) { }
  baseUrl: string = "https://localhost:44303/api/";

  getPosts(placeId): Observable<postForCard[]> {
    return this.httpClient.get<postForCard[]>(this.baseUrl + "posts/" + placeId);
  }

  getPost(postId): Observable<post> {
    return this.httpClient.get<post>(this.baseUrl + "post/" + postId);
  }
}
