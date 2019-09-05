import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CountryComponent } from './country/country.component';
import { CityComponent } from './city/city.component';
import { FamousPlaceComponent } from './famous-place/famous-place.component';
import { PostComponent } from './post/post.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { ProfileDetailComponent } from './profile/profile-detail/profile-detail.component';
import { FollowingAccountComponent } from './followingAccount/followingAccount.component';
import { PostDetailComponent } from './post/post-detail/post-detail.component';
import { CountryDetailComponent } from './country/country-detail/country-detail.component';
import { CityDetailComponent } from './city/city-detail/city-detail.component';
import { FamousPlaceDetailComponent } from './famous-place/famous-place-detail/famous-place-detail.component';
import { PostAddComponent } from './post/post-add/post-add.component';
import { ProfileRelationComponent } from './profile/profile-relation/profile-relation.component';
import { ExploreComponent } from './explore/explore.component';

export const routes: Routes = [
  { path: 'countries', component: CountryComponent },
  { path: 'country/:countryID', component: CountryDetailComponent },
  { path: 'cities/:countryID', component: CityComponent },
  { path: 'city/:cityID', component: CityDetailComponent },
  { path: 'famousPlaces/:cityID', component: FamousPlaceComponent },
  { path: 'famousPlace/:famousPlaceID', component: FamousPlaceDetailComponent },
  { path: 'posts/:famousPlaceID', component: PostComponent },
  { path: 'post/:postID', component: PostDetailComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile/:accountID', component: ProfileComponent },
  { path: 'profileDetail/:accountID', component: ProfileDetailComponent },
  { path: 'relations/:accountID', component: ProfileRelationComponent },
  { path: '', component: CountryComponent },
  { path: 'explore', component: ExploreComponent },
  { path: 'followings', component: FollowingAccountComponent },
  { path: 'post-add', component: PostAddComponent },
  { path: '**', redirectTo: 'countries', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
