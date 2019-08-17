import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CountryForCard } from '../models/countryForCard';
import { Observable } from 'rxjs';
import { Country } from '../models/country';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

constructor(private httpClient:HttpClient) { }

  baseUrl:string="https://localhost:44303/api/";
  
  getCountries():Observable<CountryForCard[]>{
    return this.httpClient.get<CountryForCard[]>(this.baseUrl+'countries');
  }

  getCountryById(countryId):Observable<Country>{
    return this.httpClient.get<Country>(this.baseUrl+'country/'+countryId);
  }
}
