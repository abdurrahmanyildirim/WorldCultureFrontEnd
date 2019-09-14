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

  constructor(private countryService: CountryService,
    private authService:AuthService) { }

  countries: CountryForCard[];
  searchKey: string;
  decodenToken:any;

  ngOnInit() {
    this.getCountries();
    this.getCurrentToken();
  }

  getCountries() {
    this.countryService.getCountries().subscribe(data => {
      this.countries = data;
    })
  }

  getCurrentToken(){
    this.decodenToken=this.authService.getCurrentAccountRole();
  }
  
}
