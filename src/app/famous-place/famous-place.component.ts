import { Component, OnInit } from '@angular/core';
import { FamousPlaceService } from '../services/famous-place.service';
import { ActivatedRoute } from '@angular/router';
import { famousPlace } from '../models/famousPlace';
import { famousPlaceForCard } from '../models/famousPlaceForCard';

@Component({
  selector: 'app-famous-place',
  templateUrl: './famous-place.component.html',
  styleUrls: ['./famous-place.component.css'],
  providers: [FamousPlaceService]
})
export class FamousPlaceComponent implements OnInit {

  constructor(private famousPlaceService: FamousPlaceService,
    private activatedRoute: ActivatedRoute
  ) { }

  famousPlace: famousPlace;
  famousPlacesForCard: famousPlaceForCard[];

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      if (params["cityID"]) {
        this.getFamousPlaces(params["cityID"])
      } else {
        this.getFamousPlace(params["famousPlaceID"])
      }
    })
  }

  getFamousPlaces(cityId){
    this.famousPlaceService.getFamousPlaces(cityId).subscribe(data=>{
      this.famousPlacesForCard=data;
    })
  }

  getFamousPlace(placeId){
    this.famousPlaceService.getFamousPlace(placeId).subscribe(data=>{
      this.famousPlace=data;
    })
  }

}
