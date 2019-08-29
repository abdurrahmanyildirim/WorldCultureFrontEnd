import { Component, OnInit } from '@angular/core';
import { Country } from 'src/app/models/country';
import { CountryService } from 'src/app/services/country.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-country-detail',
  templateUrl: './country-detail.component.html',
  styleUrls: ['./country-detail.component.css']
})
export class CountryDetailComponent implements OnInit {

  constructor(private countryService:CountryService,
    private activatedRoute:ActivatedRoute) { }

  country: Country;

  ngOnInit() {
    this.activatedRoute.params.subscribe(params=>{
      this.getCountry(params["countryID"]);
    })
  }

  getCountry(countryId){
    this.countryService.getCountryById(countryId).subscribe(data => {
      this.country = data;
    })
  }
}
