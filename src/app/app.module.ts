//Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FileUploadModule } from 'ng2-file-upload';
import { NgxEditorModule } from 'ngx-editor';
import { AppRoutingModule } from './app-routing.module';
import { AlertifyService } from './services/alertify.service';

//Pipes
import { FilterCountryPipe } from '../app/country/filterCountry.pipe';

//Components
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
import { SettingComponent } from './setting/setting.component';
import { from } from 'rxjs';
import { PostDetailComponent } from './post/post-detail/post-detail.component';
import { CityDetailComponent } from './city/city-detail/city-detail.component';
import { FamousPlaceDetailComponent } from './famous-place/famous-place-detail/famous-place-detail.component';
import { CountryDetailComponent } from './country/country-detail/country-detail.component';
import { PostAddComponent } from './post/post-add/post-add.component';
import { ProfileRelationComponent } from './profile/profile-relation/profile-relation.component';
import { FooterComponent } from './footer/footer.component';
import { ExploreComponent } from './explore/explore.component';

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
      SettingComponent,
      FilterCountryPipe,
      PostDetailComponent,
      CityDetailComponent,
      FamousPlaceDetailComponent,
      CountryDetailComponent,
      PostAddComponent,
      ProfileRelationComponent,
      FooterComponent,
      ExploreComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      HttpClientModule,
      FormsModule,
      ReactiveFormsModule,
      FileUploadModule,
      NgxEditorModule
   ],
   providers: [
      AlertifyService
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
