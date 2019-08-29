import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms'
import { FileUploader } from 'ng2-file-upload';
import { AlertifyService } from '../services/alertify.service';
import { ProfileService } from '../services/profile.service';
import { Router, ActivatedRoute } from '@angular/router';
import { PublicSettingUser } from '../models/publicSettingUser';
import { ProfileComponent } from '../profile/profile.component';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private alertifyService: AlertifyService,
    private profileService: ProfileService,
    private profileComponent: ProfileComponent,
    private activatedRoute: ActivatedRoute) { }

  passwordSetting: boolean = false;
  photoSetting: boolean = false;
  publicSetting: boolean = false;

  accountPublicInfo: PublicSettingUser;

  baseUrl: string = "https://localhost:44303/api/";
  uploader: FileUploader;

  publicSettingForm: FormGroup;
  publicSettingObject: any = {};

  passwordChangeForm: FormGroup;
  passwordObject: any = {};

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.createPasswordChangeForm();
      this.createPublicSettingForm();
      this.initializeUploader(params["accountID"]);
    })
  }

  showPublicSettings() {
    this.profileService.getPublicSettings().subscribe(data => {
      this.accountPublicInfo = data as PublicSettingUser;
    })
    this.publicSettingForm.patchValue({
      firstName: this.accountPublicInfo.firstName,
      lastName: this.accountPublicInfo.lastName,
      birthDate: this.accountPublicInfo.birthDate,
      personelInfo: this.accountPublicInfo.personelInfo,
    });

    this.photoSetting = false;
    this.passwordSetting = false;
    this.publicSetting = true;
  }

  showPasswordSetting() {
    this.photoSetting = false;
    this.passwordSetting = true;
    this.publicSetting = false;
  }

  showPhotoUpload() {
    this.photoSetting = true;
    this.passwordSetting = false;
    this.publicSetting = false;
  }

  createPublicSettingForm() {
    this.publicSettingForm = this.fb.group({
      firstName: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      lastName: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      personelInfo: new FormControl('', [Validators.required, Validators.maxLength(120)]),
      birthDate: new FormControl('', Validators.required)
    });

  }

  changePublicSettings() {
    if (this.publicSettingForm.valid) {
      this.publicSettingObject = Object.assign({}, this.publicSettingForm.value);
      this.profileService.changePublicSettings(this.publicSettingObject).subscribe(data => {
        this.alertifyService.success("Genel ayarlar değiştirildi.");
      })
    }
  }

  initializeUploader(userId) {
    this.uploader = new FileUploader({
      url: this.baseUrl + 'profile/changeProfilePhoto',
      authToken: 'Bearer ' + localStorage.getItem('token'),
      isHTML5: true,
      allowedFileType: ['image'],
      autoUpload: false,
      removeAfterUpload: true,
      maxFileSize: 10 * 1024 * 1024
    })
    this.uploader.onSuccessItem = (item, response, status, headers) => {
      this.alertifyService.success("Fotoğraf değiştirildi.");
      this.profileComponent.getAccountData(userId);
    }
  }

  createPasswordChangeForm() {
    this.passwordChangeForm = this.fb.group({
      password: ['', [Validators.required, Validators.maxLength(20), Validators.minLength(4)]],
      confirmPassword: ['', [Validators.required]]
    }, { validator: this.matchingFields('password', 'confirmPassword') })
  }

  matchingFields(field1, field2) {
    return form => {
      if (form.controls[field1].value !== form.controls[field2].value)
        return { matchingFields: true }
    }
  }

  changePassword() {
    if (this.passwordChangeForm.valid) {
      this.passwordObject = Object.assign({}, this.passwordChangeForm.value)
      this.profileService.changePassword(this.passwordObject).subscribe(data => {
        this.alertifyService.success("Şifre değiştirildi.")
        this.passwordChangeForm.reset();
      })
    }
  }

}
