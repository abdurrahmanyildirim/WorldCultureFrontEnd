import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, observable } from 'rxjs';
import { PostForCard } from '../models/postForCard';
import { Post } from '../models/post';
import { AuthService } from './auth.service';
import { Review } from '../models/review';
import { PostForUpload } from '../models/postForUpload';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private httpClient: HttpClient,
    private authService: AuthService) { }

  baseUrl: string = "https://localhost:44303/api/";

  addPost(post:any) {
    this.httpClient.post(this.baseUrl + "post/createPost", post, { headers: this.authService.headers }).subscribe();
  }

  getPosts(placeId): Observable<PostForCard[]> {
    return this.httpClient.get<PostForCard[]>(this.baseUrl + "posts/" + placeId);
  }

  getPostsByUserID(userId): Observable<PostForCard[]> {
    return this.httpClient.get<PostForCard[]>(this.baseUrl + "postsByAccount/" + userId);
  }

  getPost(postId): Observable<Post> {
    return this.httpClient.get<Post>(this.baseUrl + "post/" + postId);
  }

  getFollowingPosts(): Observable<PostForCard[]> {
    return this.httpClient.get<PostForCard[]>(this.baseUrl + "followingAccountPosts", { headers: this.authService.headers })
  }

  sendReview(review: Review): Observable<Review[]> {
    return this.httpClient
      .post<Review[]>(this.baseUrl + "addReview", review, { headers: this.authService.headers });
  }

  getReviews(postId): Observable<Review[]> {
    return this.httpClient.get<Review[]>(this.baseUrl + "reviews/" + postId);
  }
}
