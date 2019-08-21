import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post.service';
import { PostForCard } from '../models/postForCard';

@Component({
  selector: 'app-followingAccount',
  templateUrl: './followingAccount.component.html',
  styleUrls: ['./followingAccount.component.css']
})
export class FollowingAccountComponent implements OnInit {

  constructor(private postService: PostService) { }

  followingPosts: PostForCard[];

  ngOnInit() {
    this.getFollowingPosts();
  }

  getFollowingPosts() {
    this.postService.getFollowingPosts().subscribe(data => {
      this.followingPosts = data;
    })
  }

}
