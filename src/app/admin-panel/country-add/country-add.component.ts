import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { FileUploader } from 'ng2-file-upload';
import { Photo } from 'src/app/models/photo';
import { AlertifyService } from 'src/app/services/alertify.service';
import { CountryService } from 'src/app/services/country.service';

@Component({
  selector: 'app-country-add',
  templateUrl: './country-add.component.html',
  styleUrls: ['./country-add.component.css']
})
export class CountryAddComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private alertifyService: AlertifyService,
    private countryService: CountryService
  ) { }

  countryForm: FormGroup;
  country: any = {};
  uploader: FileUploader;
  imageUrl: string;

  ngOnInit() {
    this.createCountryForm();
    this.initializeUploader();
  }

  addCountry() {
    if (this.countryForm.valid) {
      this.country = Object.assign({}, this.countryForm.value);
      this.countryService.addCountry(this.country);
      this.alertifyService.success("Yeni ülke eklendi.");
      this.countryForm.reset();
      this.imageUrl=null;
    }
  }

  createCountryForm() {
    this.countryForm = this.formBuilder.group({
      countryName: new FormControl('', [Validators.required, Validators.maxLength(150)]),
      population: new FormControl('', [Validators.required, Validators.maxLength(13)]),
      currency: new FormControl('', [Validators.required, Validators.maxLength(6)]),
      capital: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      president: new FormControl('', [Validators.required, Validators.maxLength(80)]),
      summaryInfo: new FormControl('', Validators.required),
      flagPhotoPath: new FormControl('', Validators.required),
      ethnicIdentity: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      language: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      foundedDate: new FormControl('', [Validators.required]),
      publicId: new FormControl('', Validators.required)
    });
  }

  initializeUploader() {
    this.uploader = new FileUploader({
      url: 'https://localhost:44303/api/country/upload-photo',
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
        this.countryForm.patchValue({
          flagPhotoPath: res.photoPath,
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
