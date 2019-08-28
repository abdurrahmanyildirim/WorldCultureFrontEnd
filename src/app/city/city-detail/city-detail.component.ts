import { Component, OnInit } from '@angular/core';
import { City } from 'src/app/models/city';
import { ActivatedRoute } from '@angular/router';
import { CityService } from 'src/app/services/city.service';

@Component({
  selector: 'app-city-detail',
  templateUrl: './city-detail.component.html',
  styleUrls: ['./city-detail.component.css']
})
export class CityDetailComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute,
    private cityService: CityService) { }

  city: City;

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.getCity(params["cityID"]);
    })
  }

  getCity(cityId) {
    this.cityService.getCityByCityID(cityId).subscribe(data => {
      this.city = data;
    })
  }

}
