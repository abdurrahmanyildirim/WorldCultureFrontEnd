import { Component, OnInit } from '@angular/core';
import { CityService } from '../services/city.service';
import { ActivatedRoute } from '@angular/router';
import { City } from '../models/city';
import { CityForCard } from '../models/cityForCard';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css'],
  providers: [CityService]
})
export class CityComponent implements OnInit {

  constructor(private cityService: CityService,
    private activatedRoute: ActivatedRoute
  ) { }

  citiesForCard: CityForCard[];

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.getDataForCards(params["countryID"])
    })
  }

  getDataForCards(countryId) {
    this.cityService.getCitiesByCountryID(countryId).subscribe(data => {
      this.citiesForCard = data;
    });
  }



}
