import { Component, OnInit } from '@angular/core';
import { CountryService } from '../services/country.service';
import { CountryForCard } from '../models/countryForCard';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css'],
  providers: [CountryService]
})
export class CountryComponent implements OnInit {

  constructor(private countryService: CountryService) { }

  countries: CountryForCard[];
  searchKey: string;
  hataMesaji:any;
  

  ngOnInit() {
    this.getCountries();
  }

  getCountries() {
    this.countryService.getCountries().subscribe(data => {
      this.countries = data;
    })
  }
  
}
