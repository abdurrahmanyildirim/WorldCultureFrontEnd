import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post';
import { Review } from 'src/app/models/review';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertifyService } from 'src/app/services/alertify.service';
import { PostService } from 'src/app/services/post.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {

  constructor(private alertifyService: AlertifyService,
    private postService: PostService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private authService: AuthService) { }

  post: Post;
  reviews: Review[];
  reviewForm: FormGroup;
  review: any = {};

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.getPost(params["postID"])
      this.createReviewForm(params["postID"])
      this.getReviews(params["postID"])
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

  getPost(postId) {
    this.postService.getPost(postId).subscribe(data => {
      this.post = data;
    })
  }

  get isAuthenticate() {
    return this.authService.loggedIn();
  }

}
