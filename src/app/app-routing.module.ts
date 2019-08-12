import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CountryComponent } from './country/country.component';
import { CityComponent } from './city/city.component';
import { FamousPlaceComponent } from './famous-place/famous-place.component';
import { PostComponent } from './post/post.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
  { path: 'countries', component: CountryComponent },
  { path: 'country/:countryId', component: CountryComponent },
  { path: 'cities/:countryID', component: CityComponent },
  { path: 'city/:cityID', component: CityComponent },
  { path: 'famousPlaces/:cityID', component: FamousPlaceComponent },
  { path: 'famousPlace/:famousPlaceID', component: FamousPlaceComponent },
  { path: 'posts/:famousPlaceID', component: PostComponent },
  { path: 'post/:postID', component: PostComponent },
  { path: 'login', component: LoginComponent },
  { path: '', component: CountryComponent },
  { path: '**', redirectTo: 'countries', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
