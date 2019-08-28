import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CountryService } from '../services/country.service';
import { Country } from '../models/country';
import { CountryForCard } from '../models/countryForCard';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css'],
  providers: [CountryService]
})
export class CountryComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute
    , private countryService: CountryService) { }

  country: Country;
  countries: CountryForCard[];
  searchKey:string;

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.fillData(params["countryId"])
    })
  }



  fillData(countryId) {
    if (countryId) {
      this.countryService.getCountryById(countryId).subscribe(data => {
        this.country = data;
      })
    } else {
      this.countryService.getCountries().subscribe(data => {
        this.countries = data;
      })
    }
  }

}
