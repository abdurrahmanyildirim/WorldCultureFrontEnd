import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CountryComponent } from './country/country.component';
import { CityComponent } from './city/city.component';
import { FamousPlaceComponent } from './famous-place/famous-place.component';

export const routes: Routes = [
  { path: 'countries', component: CountryComponent },
  { path: '', component: CountryComponent },
  { path: 'country/:countryId', component: CountryComponent },
  { path:'cities/:countryID',component:CityComponent },
  { path:'city/:cityID',component:CityComponent },
  { path:'famousPlaces/:cityID',component:FamousPlaceComponent},
  { path:'famousPlace/:famousPlaceID',component:FamousPlaceComponent},
  { path: '**', redirectTo: 'countries', pathMatch: 'full' }
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
