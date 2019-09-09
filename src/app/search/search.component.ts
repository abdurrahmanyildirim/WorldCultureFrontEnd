import { Component, OnInit } from '@angular/core';
import { ProfileUser } from '../models/profileUser';
import { ProfileService } from '../services/profile.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private profileService: ProfileService,
    private activatedRoute: ActivatedRoute
  ) { }

  results: ProfileUser[];

  ngOnInit() {
    this.search(this.activatedRoute.snapshot.queryParamMap.get('key'));
  }

  search(key) {
    this.profileService.getSearch(key).subscribe(data => {
      this.results = data
    });
  }
}
