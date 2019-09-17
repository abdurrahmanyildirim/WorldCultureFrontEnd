import { Component, OnInit } from '@angular/core';
import { CountryService } from 'src/app/services/country.service';
import { CountryForCard } from 'src/app/models/countryForCard';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { CityService } from 'src/app/services/city.service';
import { FileUploader } from 'ng2-file-upload';
import { Photo } from 'src/app/models/photo';
import { AlertifyService } from 'src/app/services/alertify.service';

@Component({
  selector: 'app-city-add',
  templateUrl: './city-add.component.html',
  styleUrls: ['./city-add.component.css']
})
export class CityAddComponent implements OnInit {

  constructor(
    private countryService: CountryService,
    private formBuilder: FormBuilder,
    private cityService: CityService,
    private alertifyService: AlertifyService
  ) { }

  countries: CountryForCard[];
  imageUrl: string;
  cityForm: FormGroup;
  city: any = {};
  uploader: FileUploader;

  ngOnInit() {
    this.getCountries();
    this.createCityForm();
    this.initializeUploader();
  }

  getCountries() {
    this.countryService.getCountries().subscribe(data => {
      this.countries = data
    });
  }

  addCity() {
    if (this.cityForm.valid) {
      this.city = Object.assign({}, this.cityForm.value);
      this.cityService.add(this.city);
      this.alertifyService.success("Şehir Eklendi.");
      this.cityForm.reset();
    }
  }

  createCityForm() {
    this.cityForm = this.formBuilder.group({
      countryID: new FormControl('', Validators.required),
      cityName: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      population: new FormControl('', [Validators.required, Validators.maxLength(13)]),
      description: new FormControl('', Validators.required),
      cityPhotoPath: new FormControl('', Validators.required),
      publicId: new FormControl('', Validators.required)
    });
  }

  initializeUploader() {
    this.uploader = new FileUploader({
      url: 'https://localhost:44303/api/city/upload-photo',
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
        this.cityForm.patchValue({
          cityPhotoPath: res.photoPath,
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
