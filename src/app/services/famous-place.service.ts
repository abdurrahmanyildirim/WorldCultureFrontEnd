import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FamousPlaceForCard } from '../models/famousPlaceForCard';
import { FamousPlace } from '../models/famousPlace';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FamousPlaceService {

  constructor(
    private httpClient: HttpClient
  ) { }

  baseUrl: string = environment.path + "/api/";

  getFamousPlaces(cityId): Observable<FamousPlaceForCard[]> {
    return this.httpClient.get<FamousPlaceForCard[]>(this.baseUrl + "places/" + cityId);
  }

  getFamousPlace(famousPlaceId): Observable<FamousPlace> {
    return this.httpClient.get<FamousPlace>(this.baseUrl + "place/" + famousPlaceId);
  }

  add(famousPlace: any) {
    this.httpClient
      .post(this.baseUrl + "place/add-place", famousPlace)
      .subscribe();
  }

}
