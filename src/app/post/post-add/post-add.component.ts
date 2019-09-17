import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FileUploader } from 'ng2-file-upload';

//Models
import { Photo } from 'src/app/models/photo';
import { CityForCard } from 'src/app/models/cityForCard';
import { CountryForCard } from 'src/app/models/countryForCard';
import { FamousPlaceForCard } from 'src/app/models/famousPlaceForCard';

//Services
import { FamousPlaceService } from 'src/app/services/famous-place.service';
import { CityService } from 'src/app/services/city.service';
import { CountryService } from 'src/app/services/country.service';
import { AuthService } from 'src/app/services/auth.service';
import { PostService } from 'src/app/services/post.service';
import { AlertifyService } from 'src/app/services/alertify.service';

@Component({
  selector: 'app-post-add',
  templateUrl: './post-add.component.html',
  styleUrls: ['./post-add.component.css']
})
export class PostAddComponent implements OnInit {

  constructor(private countryService: CountryService,
    private cityService: CityService,
    private famousPlaceService: FamousPlaceService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private postService: PostService,
    private router: Router,
    private alertifyService: AlertifyService
  ) { }

  countries: CountryForCard[];
  cities: CityForCard[];
  famousPlaces: FamousPlaceForCard[];
  uploader: FileUploader;
  baseUrl: string = "https://localhost:44303/api/";

  postForm: FormGroup;
  post: any = {};
  imageUrl: string;


  ngOnInit() {
    if (this.isAuthenticate) {
      this.getCountries();
      this.createPostForm();
      this.initializeUploader();
    } else {
      this.router.navigateByUrl('/login');
      this.alertifyService.error("İzinsiz giriş tespit edildi!");
    }

  }

  createPostForm() {
    this.postForm = this.formBuilder.group({
      accountID: [this.authService.getCurrentAccountId(), Validators.required],
      famousPlaceID: ['', Validators.required],
      postPhotoPath: ['', Validators.required],
      publicId: ['', Validators.required],
      description: ['', [Validators.required, Validators.maxLength(500)]],
      title: ['', [Validators.required, Validators.maxLength(30)]]
    });
  }

  addPost() {
    if (this.postForm.valid) {
      this.post = Object.assign({}, this.postForm.value)
      this.postService.addPost(this.post);
      this.postForm.reset();
      this.alertifyService.success("Post paylaşımı başarılı.");
    }
  }

  initializeUploader() {
    this.uploader = new FileUploader({
      url: this.baseUrl + 'post/uploadPhoto',
      authToken: 'Bearer ' + localStorage.getItem('token'),
      isHTML5: true,
      allowedFileType: ['image'],
      autoUpload: false,
      removeAfterUpload: true,
      maxFileSize: 10 * 1024 * 1024
    })

    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if (response) {
        const res: Photo = JSON.parse(response);
        this.postForm.patchValue({
          postPhotoPath: res.photoPath,
          publicId: res.publicId
        })
        this.imageUrl = res.photoPath;
        this.alertifyService.success("Fotoğraf başarıyla yüklendi.")
      }
    }
  }

  getCountries() {
    this.countryService.getCountries().subscribe(data => {
      this.countries = data;
      this.getCities(this.countries[0].countryID);
    })
  }

  getCities(countryId) {
    this.cityService.getCitiesByCountryID(countryId).subscribe(data => {
      this.cities = data;
      this.postForm.patchValue({
        famousPlaceID: ''
      })
      this.getFamousPlaces(this.cities[0].cityID);
    })
  }

  getFamousPlaces(cityId) {
    this.famousPlaceService.getFamousPlaces(cityId).subscribe(data => {
      this.famousPlaces = data;
      this.postForm.patchValue({
        famousPlaceID: ''
      })
    })
  }

  get isAuthenticate() {
    return this.authService.loggedIn();
  }

}
