import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CountryComponent } from './country/country.component';
import { CityComponent } from './city/city.component';

export const routes: Routes = [
  { path: 'countries', component: CountryComponent },
  { path: '', component: CountryComponent },
  { path: 'country/:countryId', component: CountryComponent },
  { path:'cities/:countryID',component:CityComponent },
  { path:'city/:cityId',component:CityComponent },
  { path: '**', redirectTo: 'countries', pathMatch: 'full' }
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
