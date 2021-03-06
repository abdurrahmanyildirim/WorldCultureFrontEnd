//Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
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
import { FollowingAccountComponent } from './followingAccount/followingAccount.component';
import { PostDetailComponent } from './post/post-detail/post-detail.component';
import { CityDetailComponent } from './city/city-detail/city-detail.component';
import { FamousPlaceDetailComponent } from './famous-place/famous-place-detail/famous-place-detail.component';
import { CountryDetailComponent } from './country/country-detail/country-detail.component';
import { PostAddComponent } from './post/post-add/post-add.component';
import { ProfileRelationComponent } from './profile/profile-relation/profile-relation.component';
import { FooterComponent } from './footer/footer.component';
import { ExploreComponent } from './explore/explore.component';
import { SearchComponent } from './search/search.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { CountryAddComponent } from './admin-panel/country-add/country-add.component';
import { CityAddComponent } from './admin-panel/city-add/city-add.component';
import { FamousPlaceAddComponent } from './admin-panel/famous-place-add/famous-place-add.component';
import { ProfilePasswordComponent } from './profile/profile-password/profile-password.component';
import { ProfilePhotoComponent } from './profile/profile-photo/profile-photo.component';
import { ProfilePublicInfoComponent } from './profile/profile-public-info/profile-public-info.component';

//Guards
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';
import { FormKontrol } from './guards/formKontrol';
import { AuthInterceptorService } from './services/auth-interceptor.service';


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
      FollowingAccountComponent,
      FilterCountryPipe,
      PostDetailComponent,
      CityDetailComponent,
      FamousPlaceDetailComponent,
      CountryDetailComponent,
      PostAddComponent,
      ProfileRelationComponent,
      FooterComponent,
      ExploreComponent,
      SearchComponent,
      AdminPanelComponent,
      CountryAddComponent,
      CityAddComponent,
      FamousPlaceAddComponent,
      ProfilePasswordComponent,
      ProfilePhotoComponent,
      ProfilePublicInfoComponent
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
      AlertifyService,
      AuthGuard,
      RoleGuard,
      FormKontrol,
      { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
