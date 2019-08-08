import { Component, OnInit } from '@angular/core';
import { CityService } from '../services/city.service';
import { ActivatedRoute } from '@angular/router';
import { from } from 'rxjs';
import { city } from '../models/city';
import { cityForCard } from '../models/cityForCard';

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

  city: city;
  citiesForCard: cityForCard[];

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      if (params["countryID"]) {
        this.getDataForCards(params["countryID"])
      } else {
        this.getDataForCityDetail(params["cityID"])
      }
    })
  }
  
  getDataForCards(countryId) {
    this.cityService.getCitiesByCountryID(countryId).subscribe(data => {
      this.citiesForCard = data;
    });
  }

  getDataForCityDetail(cityId) {
    this.cityService.getCityByCityID(cityId).subscribe(data => {
      this.city = data;
    })
  }

}
