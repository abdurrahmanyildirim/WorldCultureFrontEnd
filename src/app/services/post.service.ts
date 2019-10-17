import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, observable } from 'rxjs';
import { PostForCard } from '../models/postForCard';
import { Post } from '../models/post';
import { Review } from '../models/review';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(
    private httpClient: HttpClient
  ) { }

  baseUrl: string = environment.path + "/api/";

  addPost(post: any) {
    this.httpClient.post(this.baseUrl + "post/createPost", post)
      .subscribe();
  }

  deletePostPhoto(publicId: string) {
    this.httpClient
      .delete(this.baseUrl + "post/delete-photo?publicId=" + publicId)
      .subscribe();
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
    return this.httpClient.get<PostForCard[]>(this.baseUrl + "followingAccountPosts")
  }

  sendReview(review: Review): Observable<Review[]> {
    return this.httpClient
      .post<Review[]>(this.baseUrl + "addReview", review);
  }

  getReviews(postId): Observable<Review[]> {
    return this.httpClient.get<Review[]>(this.baseUrl + "reviews/" + postId);
  }

  getRandomPosts(): Observable<PostForCard[]> {
    return this.httpClient.get<PostForCard[]>(this.baseUrl + "post/random-posts");
  }

  getMostViewPosts(): Observable<PostForCard[]> {
    return this.httpClient.get<PostForCard[]>(this.baseUrl + "post/most-view-posts");
  }
}
