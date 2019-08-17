import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FamousPlaceForCard } from '../models/famousPlaceForCard';
import { FamousPlace } from '../models/famousPlace';

@Injectable({
  providedIn: 'root'
})
export class FamousPlaceService {

  constructor(private httpClient: HttpClient) { }

  baseUrl: string = "https://localhost:44303/api/";

  getFamousPlaces(cityId): Observable<FamousPlaceForCard[]> {
    return this.httpClient.get<FamousPlaceForCard[]>(this.baseUrl + "places/" + cityId);
  }

  getFamousPlace(famousPlaceId): Observable<FamousPlace> {
    return this.httpClient.get<FamousPlace>(this.baseUrl + "place/" + famousPlaceId);
  }

}
