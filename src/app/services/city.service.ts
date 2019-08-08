import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { cityForCard } from '../models/cityForCard';
import { city } from '../models/city';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  constructor(private httpClient: HttpClient) { }

  baseUrl:string="https://localhost:44303/api/";
  getCitiesByCountryID(countryId):Observable<cityForCard[]> {
    return this.httpClient.get<cityForCard[]>(this.baseUrl + "cities/"+countryId);
  }

  getCityByCityID(cityId):Observable<city>{
    return this.httpClient.get<city>(this.baseUrl+"city/"+cityId);
  }
}
