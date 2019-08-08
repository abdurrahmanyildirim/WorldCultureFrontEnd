import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { famousPlaceForCard } from '../models/famousPlaceForCard';
import { famousPlace } from '../models/famousPlace';

@Injectable({
  providedIn: 'root'
})
export class FamousPlaceService {

  constructor(private httpClient: HttpClient) { }

  baseUrl: string = "https://localhost:44303/api/";

  getFamousPlaces(cityId): Observable<famousPlaceForCard[]> {
    return this.httpClient.get<famousPlaceForCard[]>(this.baseUrl + "places/" + cityId);
  }

  getFamousPlace(famousPlaceId): Observable<famousPlace> {
    return this.httpClient.get<famousPlace>(this.baseUrl + "place/" + famousPlaceId);
  }

}
