import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post.service';
import { ProfileService } from '../services/profile.service';
import { PostForCard } from '../models/postForCard';
import { ProfileUser } from '../models/profileUser';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.css']
})
export class ExploreComponent implements OnInit {

  constructor(private postService: PostService,
    private profileService: ProfileService
  ) { }

  mostViewPosts: PostForCard[];
  randomPosts: PostForCard[];
  mostFollowerAccounts: ProfileUser[];

  ngOnInit() {
    this.getMostViewPosts();
  }

  showMostFollowerAccounts() {
    this.mostViewPosts = null;
    this.randomPosts = null;
    this.getMostFollowerAccounts();
  }

  showRandomPosts() {
    this.mostViewPosts = null;
    this.mostFollowerAccounts = null;
    this.getRandomPosts();
  }

  showMostViewPosts() {
    this.randomPosts = null;
    this.mostFollowerAccounts = null;
    this.getMostViewPosts();
  }
  
  getMostViewPosts() {
    this.postService.getMostViewPosts().subscribe(data => {
      this.mostViewPosts = data;
    })
  }

  getRandomPosts() {
    this.postService.getRandomPosts().subscribe(data => {
      this.randomPosts = data;
    })
  }

  getMostFollowerAccounts() {
    this.profileService.getMostFollowerAccounts().subscribe(data => {
      this.mostFollowerAccounts = data;
    })
  }

}
