import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post.service';
import { ActivatedRoute } from '@angular/router';
import { PostForCard } from '../models/postForCard';
import { Post } from '../models/post';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
  providers: [PostService]
})
export class PostComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute,
    private postService: PostService) { }

  postsForCards: PostForCard[];
  post: Post;

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      if (params["famousPlaceID"]) {
        this.getPosts(params["famousPlaceID"])
      } else {
        this.getPost(params["postID"])
      }
    })
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
}
