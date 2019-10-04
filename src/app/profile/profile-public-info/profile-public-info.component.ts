import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ProfileService } from 'src/app/services/profile.service';
import { AlertifyService } from 'src/app/services/alertify.service';
import { PublicSettingUser } from 'src/app/models/publicSettingUser';

@Component({
  selector: 'app-profile-public-info',
  templateUrl: './profile-public-info.component.html',
  styleUrls: ['./profile-public-info.component.css']
})
export class ProfilePublicInfoComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private profileService: ProfileService,
    private alertifyService: AlertifyService
  ) { }

  accountPublicInfo: PublicSettingUser;

  publicInfoForm: FormGroup;
  publicInfoObject: any = {};

  ngOnInit() {
    this.createPublicInfoForm();
    this.fillPublicInfo();
  }

  fillPublicInfo() {
    this.profileService.getPublicSettings().subscribe(data => {
      this.accountPublicInfo = data;
    })
    this.publicInfoForm.patchValue({
      firstName: this.accountPublicInfo.firstName,
      lastName: this.accountPublicInfo.lastName,
      birthDate: this.accountPublicInfo.birthDate,
      personelInfo: this.accountPublicInfo.personelInfo,
    });
  }

  createPublicInfoForm() {
    this.publicInfoForm = this.fb.group({
      firstName: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      lastName: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      personelInfo: new FormControl('', [Validators.required, Validators.maxLength(120)]),
      birthDate: new FormControl('', Validators.required)
    });
  }

  changePublicSettings() {
    if (this.publicInfoForm.valid) {
      this.publicInfoObject = Object.assign({}, this.publicInfoForm.value);
      this.profileService.changePublicSettings(this.publicInfoObject)
        .subscribe(data => {
          this.alertifyService.success("Genel ayarlar değiştirildi.");
        })
    }
  }
}
