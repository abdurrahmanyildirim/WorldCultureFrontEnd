import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PostForCard } from '../models/postForCard';

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

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
        this.getPosts(params["famousPlaceID"])
    })
  }

  getPosts(placeId) {
    this.postService.getPosts(placeId).subscribe(data => {
      this.postsForCards = data;
    })
  }


}
