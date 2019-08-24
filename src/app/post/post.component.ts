import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post.service';
import { ActivatedRoute } from '@angular/router';
import { PostForCard } from '../models/postForCard';
import { Post } from '../models/post';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Review } from '../models/review';
import { AuthService } from '../services/auth.service';
import { AlertifyService } from '../services/alertify.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
  providers: [PostService]
})
export class PostComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute,
    private postService: PostService,
    private formBuilder: FormBuilder,
    private authService:AuthService,
    private alertifyService:AlertifyService) { }

  postsForCards: PostForCard[];
  post: Post;
  reviews: Review[];
  reviewForm: FormGroup;
  review: any = {};

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      if (params["famousPlaceID"]) {
        this.getPosts(params["famousPlaceID"])
      } else {
        this.getPost(params["postID"])
        this.createReviewForm(params["postID"])
        this.getReviews(params["postID"])
      }
    })
  }

  createReviewForm(postId) {
    this.reviewForm = this.formBuilder.group({
      postID: postId,
      name: ["", [Validators.required, Validators.maxLength(30)]],
      rate: ["", [Validators.required]],
      reviewContent: ["", [Validators.required, Validators.maxLength(300)]]
    });
  }

  getReviews(postId) {
    this.postService.getReviews(postId).subscribe(data => {
      this.reviews = data;
    })
  }

  sendReview() {
    if (this.reviewForm.valid) {
      this.review = Object.assign({}, this.reviewForm.value);
      this.postService.sendReview(this.review).subscribe(data => {
        this.reviews = data;
        this.reviewForm.reset();
        this.alertifyService.success("Yorum gönderildi.")
      });
    }
  }

  getPosts(placeId) {
    this.postService.getPosts(placeId).subscribe(data => {
      this.postsForCards = data;
    })
  }

  getPost(postId) {
    this.postService.getPost(postId).subscribe(data => {
      this.post = data;
    })
  }

  get isAuthenticate(){
    return this.authService.loggedIn();
  }
}
