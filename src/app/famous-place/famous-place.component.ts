import { Component, OnInit } from '@angular/core';
import { FamousPlaceService } from '../services/famous-place.service';
import { ActivatedRoute } from '@angular/router';
import { FamousPlaceForCard } from '../models/famousPlaceForCard';

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

  famousPlacesForCard: FamousPlaceForCard[];

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
        this.getFamousPlaces(params["cityID"])
    })
  }

  getFamousPlaces(cityId){
    this.famousPlaceService.getFamousPlaces(cityId).subscribe(data=>{
      this.famousPlacesForCard=data;
    })
  }

}
