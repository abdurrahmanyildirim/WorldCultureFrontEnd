import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CountryComponent } from './country/country.component';
import { CityComponent } from './city/city.component';
import { FamousPlaceComponent } from './famous-place/famous-place.component';
import { PostComponent } from './post/post.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { FollowingAccountComponent } from './followingAccount/followingAccount.component';
import { PostDetailComponent } from './post/post-detail/post-detail.component';
import { CountryDetailComponent } from './country/country-detail/country-detail.component';
import { CityDetailComponent } from './city/city-detail/city-detail.component';
import { FamousPlaceDetailComponent } from './famous-place/famous-place-detail/famous-place-detail.component';
import { PostAddComponent } from './post/post-add/post-add.component';
import { ProfileRelationComponent } from './profile/profile-relation/profile-relation.component';
import { ExploreComponent } from './explore/explore.component';
import { SearchComponent } from './search/search.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { CityAddComponent } from './admin-panel/city-add/city-add.component';
import { CountryAddComponent } from './admin-panel/country-add/country-add.component';
import { FamousPlaceAddComponent } from './admin-panel/famous-place-add/famous-place-add.component';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';
import { FormKontrol } from './guards/formKontrol';
import { ProfilePasswordComponent } from './profile/profile-password/profile-password.component';
import { ProfilePhotoComponent } from './profile/profile-photo/profile-photo.component';
import { ProfilePublicInfoComponent } from './profile/profile-public-info/profile-public-info.component';

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
  {
    path: 'profile/:accountID', component: ProfileComponent
    , children: [
      {path: 'profile-public-info',component:ProfilePublicInfoComponent},
      {path: 'profile-password',component:ProfilePasswordComponent},
      {path:'profile-photo',component:ProfilePhotoComponent}
    ]
  },
  { path: 'search', component: SearchComponent },
  { path: 'relations/:accountID', component: ProfileRelationComponent },
  { path: '', component: CountryComponent },
  { path: 'explore', component: ExploreComponent },
  {
    path: 'followings', component: FollowingAccountComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'post-add', component: PostAddComponent,
    canActivate: [AuthGuard],
    canDeactivate: [FormKontrol]
  },
  {
    path: 'admin-panel', component: AdminPanelComponent,
    canActivate: [AuthGuard, RoleGuard]
    , children: [
      { path: 'city-add', component: CityAddComponent },
      { path: 'country-add', component: CountryAddComponent },
      { path: 'famous-place-add', component: FamousPlaceAddComponent }
    ]
  },

  { path: '**', redirectTo: 'countries', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
