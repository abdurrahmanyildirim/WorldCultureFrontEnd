import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FamousPlaceService } from 'src/app/services/famous-place.service';
import { FamousPlace } from 'src/app/models/famousPlace';

@Component({
  selector: 'app-famous-place-detail',
  templateUrl: './famous-place-detail.component.html',
  styleUrls: ['./famous-place-detail.component.css']
})
export class FamousPlaceDetailComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute,
    private famousPlaceService: FamousPlaceService) { }

  famousPlace: FamousPlace;

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.getFamousPlace(params["famousPlaceID"])
    })
  }

  getFamousPlace(placeId) {
    this.famousPlaceService.getFamousPlace(placeId).subscribe(data => {
      this.famousPlace = data;
    })
  }

}
