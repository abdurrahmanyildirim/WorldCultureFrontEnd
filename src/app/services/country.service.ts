import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { countryForCard } from '../models/countryForCard';
import { Observable } from 'rxjs';
import { country } from '../models/country';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

constructor(private httpClient:HttpClient) { }

  baseUrl:string="https://localhost:44303/api/";
  
  getCountries():Observable<countryForCard[]>{
    return this.httpClient.get<countryForCard[]>(this.baseUrl+'countries');
  }

  getCountryById(countryId):Observable<country>{
    return this.httpClient.get<country>(this.baseUrl+'country/'+countryId);
  }
}
