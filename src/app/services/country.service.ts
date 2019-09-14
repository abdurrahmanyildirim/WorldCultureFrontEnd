import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CountryForCard } from '../models/countryForCard';
import { Observable } from 'rxjs';
import { Country } from '../models/country';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(private httpClient: HttpClient,
    private authService: AuthService) { }

  baseUrl: string = "https://localhost:44303/api/";

  getCountries(): Observable<CountryForCard[]> {
    return this.httpClient.get<CountryForCard[]>(this.baseUrl + 'countries');
  }

  getCountryById(countryId): Observable<Country> {
    return this.httpClient.get<Country>(this.baseUrl + 'country/' + countryId);
  }

  addCountry(country: any) {
    this.httpClient
    .post(this.baseUrl + "country/add-country", country, { headers: this.authService.headers })
    .subscribe();
  }
}
