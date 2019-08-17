import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { ActivatedRoute } from '@angular/router';
import { PostForCard } from 'src/app/models/postForCard';

@Component({
  selector: 'app-profile-detail',
  templateUrl: './profile-detail.component.html',
  styleUrls: ['./profile-detail.component.css']
})
export class ProfileDetailComponent implements OnInit {

  constructor(private postService: PostService,
    private activatedRoute: ActivatedRoute
  ) { }

  postsForProfile: PostForCard[];

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.getPosts(params["accountID"]);
    })
  }

  getPosts(userId) {
    this.postService.getPostsByUserID(userId).subscribe(data=>{
      this.postsForProfile=data;
    })
  }

}
