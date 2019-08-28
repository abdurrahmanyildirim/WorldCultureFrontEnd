import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FileUploadModule } from 'ng2-file-upload';
import { FilterCountryPipe } from '../app/country/filterCountry.pipe'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { CountryComponent } from './country/country.component';
import { CityComponent } from './city/city.component';
import { FamousPlaceComponent } from './famous-place/famous-place.component';
import { PostComponent } from './post/post.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { ProfileDetailComponent } from './profile/profile-detail/profile-detail.component';
import { FollowingAccountComponent } from './followingAccount/followingAccount.component';
import { AddPostComponent } from './add-post/add-post.component';
import { AlertifyService } from './services/alertify.service';
import { SettingComponent } from './setting/setting.component';
import { from } from 'rxjs';
import { PostDetailComponent } from './post/post-detail/post-detail.component';
import { CityDetailComponent } from './city/city-detail/city-detail.component';
import { FamousPlaceDetailComponent } from './famous-place/famous-place-detail/famous-place-detail.component';
import { CountryDetailComponent } from './country/country-detail/country-detail.component';

@NgModule({
   declarations: [
      AppComponent,
      HeaderComponent,
      CountryComponent,
      CityComponent,
      FamousPlaceComponent,
      PostComponent,
      LoginComponent,
      RegisterComponent,
      ProfileComponent,
      ProfileDetailComponent,
      FollowingAccountComponent,
      AddPostComponent,
      SettingComponent,
      FilterCountryPipe,
      PostDetailComponent,
      CityDetailComponent,
      FamousPlaceDetailComponent,
      CountryDetailComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      HttpClientModule,
      FormsModule,
      ReactiveFormsModule,
      FileUploadModule
   ],
   providers: [
      AlertifyService
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
