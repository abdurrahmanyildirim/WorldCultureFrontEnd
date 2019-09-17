import { Component, OnInit } from '@angular/core';
import { CountryService } from 'src/app/services/country.service';
import { CityService } from 'src/app/services/city.service';
import { CountryForCard } from 'src/app/models/countryForCard';
import { CityForCard } from 'src/app/models/cityForCard';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { FileUploader } from 'ng2-file-upload';
import { Photo } from 'src/app/models/photo';
import { AlertifyService } from 'src/app/services/alertify.service';
import { FamousPlaceService } from 'src/app/services/famous-place.service';

@Component({
  selector: 'app-famous-place-add',
  templateUrl: './famous-place-add.component.html',
  styleUrls: ['./famous-place-add.component.css']
})
export class FamousPlaceAddComponent implements OnInit {

  constructor(
    private countryService: CountryService,
    private cityService: CityService,
    private fb: FormBuilder,
    private alertifyService: AlertifyService,
    private famousPlaceService: FamousPlaceService
  ) { }

  countries: CountryForCard[];
  cities: CityForCard[];

  famousPlaceForm: FormGroup;
  famousPlace: any = {};
  uploader: FileUploader
  imageUrl;

  ngOnInit() {
    this.getCountries();
    this.createFamousPlaceForm();
    this.initializeUploader();
  }

  addPlace() {
    if (this.famousPlaceForm.valid) {
      this.famousPlace = Object.assign({}, this.famousPlaceForm.value);
      this.famousPlaceService.add(this.famousPlace);
      this.alertifyService.success("Yeni yer eklendi.");
      this.famousPlaceForm.reset();
    }
  }

  createFamousPlaceForm() {
    this.famousPlaceForm = this.fb.group({
      cityID: new FormControl('', Validators.required),
      placeName: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      description: new FormControl('', Validators.required),
      photoPath: new FormControl('', Validators.required),
      publicId: new FormControl('', Validators.required)
    })
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
    })
  }

  initializeUploader() {
    this.uploader = new FileUploader({
      url: 'https://localhost:44303/api/place/upload-photo',
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
        this.famousPlaceForm.patchValue({
          photoPath: res.photoPath,
          publicId: res.publicId
        })
        this.imageUrl = res.photoPath;
        this.alertifyService.success("Fotoğraf başarıyla yüklendi.")
      }
    }

    this.uploader.onErrorItem = () => {
      this.alertifyService.error("Fotoğraf yüklenirken bir hata meydana geldi.")
    }
  }

}
