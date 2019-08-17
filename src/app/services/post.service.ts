import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PostForCard } from '../models/postForCard';
import { Post } from '../models/post';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private httpClient: HttpClient) { }

  baseUrl: string = "https://localhost:44303/api/";

  getPosts(placeId): Observable<PostForCard[]> {
    return this.httpClient.get<PostForCard[]>(this.baseUrl + "posts/" + placeId);
  }

  getPostsByUserID(userId):Observable<PostForCard[]>{
    return this.httpClient.get<PostForCard[]>(this.baseUrl+"postsByAccount/"+userId);
  }

  getPost(postId): Observable<Post> {
    return this.httpClient.get<Post>(this.baseUrl + "post/" + postId);
  }
}
