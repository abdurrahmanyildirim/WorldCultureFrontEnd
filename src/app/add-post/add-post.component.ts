import { Component, OnInit} from '@angular/core';
import { CountryForCard } from '../models/countryForCard';
import { CityForCard } from '../models/cityForCard';
import { FamousPlaceForCard } from '../models/famousPlaceForCard';
import { CountryService } from '../services/country.service';
import { FamousPlaceService } from '../services/famous-place.service';
import { CityService } from '../services/city.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { PostService } from '../services/post.service';
import { FileUploader } from 'ng2-file-upload';
import { Photo } from '../models/photo';
import { Router } from '@angular/router';
import { AlertifyService } from '../services/alertify.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css'],
  providers: [PostService]
})
export class AddPostComponent implements OnInit {

  constructor(private countryService: CountryService,
    private cityService: CityService,
    private famousPlaceService: FamousPlaceService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private postService: PostService,
    private router:Router,
    private alertifyService:AlertifyService) { }

  countries: CountryForCard[];
  cities: CityForCard[];
  famousPlaces: FamousPlaceForCard[];
  uploader: FileUploader;
  baseUrl: string = "https://localhost:44303/api/";

  postForm: FormGroup;
  post: any = {};
  imageUrl: string;


  ngOnInit() {
    this.createPostForm();
    this.getCountries();
    this.initializeUploader();
  }

  createPostForm() {
    this.postForm = this.formBuilder.group({
      accountID: [this.authService.getCurrentAccountId(), Validators.required],
      famousPlaceID: ['', Validators.required],
      postPhotoPath: ['', Validators.required],
      publicId: ['', Validators.required],
      description: ['', [Validators.required, Validators.maxLength(300)]],
      title: ['', [Validators.required, Validators.maxLength(30)]]
    });
  }

  addPost() {
    if (this.postForm.valid) {
      this.post = Object.assign({}, this.postForm.value)
      this.postService.addPost(this.post);
      this.alertifyService.success("Post paylaşımı başarılı.");
      this.router.navigateByUrl("/countries");
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
          postPhotoPath: res.postPhotoPath,
          publicId: res.publicId
        })
        this.alertifyService.success("Fotoğraf başarıyla yüklendi.")
      }
    }
  }

  getCountries() {
    this.countryService.getCountries().subscribe(data => {
      this.countries = data;
    })
  }

  getCities(countryId) {
    this.cityService.getCitiesByCountryID(countryId).subscribe(data => {
      this.cities = data;
      this.postForm.patchValue({
        famousPlaceID:''
      })
    })
  }

  getFamousPlaces(cityId) {
    this.famousPlaceService.getFamousPlaces(cityId).subscribe(data => {
      this.famousPlaces = data;
      this.postForm.patchValue({
        famousPlaceID:''
      })
    })
  }

}
