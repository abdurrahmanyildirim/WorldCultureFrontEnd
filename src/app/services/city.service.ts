import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CityForCard } from '../models/cityForCard';
import { City } from '../models/city';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  constructor(private httpClient: HttpClient,
    private authService: AuthService
  ) { }

  baseUrl: string = "https://localhost:44303/api/";
  
  getCitiesByCountryID(countryId): Observable<CityForCard[]> {
    return this.httpClient.get<CityForCard[]>(this.baseUrl + "cities/" + countryId);
  }

  getCityByCityID(cityId): Observable<City> {
    return this.httpClient.get<City>(this.baseUrl + "city/" + cityId);
  }

  add(city: any) {
    this.httpClient.post(this.baseUrl + "city/add-city", city, { headers: this.authService.headers })
    .subscribe();
  }
}
