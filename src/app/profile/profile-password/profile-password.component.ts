import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertifyService } from 'src/app/services/alertify.service';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-profile-password',
  templateUrl: './profile-password.component.html',
  styleUrls: ['./profile-password.component.css']
})
export class ProfilePasswordComponent implements OnInit {

  constructor(private profileService: ProfileService,
    private alertifyService:AlertifyService,
    private fb:FormBuilder
  ) { }


  passwordChangeForm: FormGroup;
  passwordObject: any = {};

  ngOnInit() {
    this.createPasswordChangeForm();
  }

  createPasswordChangeForm() {
    this.passwordChangeForm = this.fb.group({
      password: ['', [Validators.required, Validators.maxLength(20), Validators.minLength(4)]],
      confirmPassword: ['', [Validators.required]]
    }, { validator: this.matchingFields('password', 'confirmPassword') })
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

  matchingFields(field1, field2) {
    return form => {
      if (form.controls[field1].value !== form.controls[field2].value)
        return { matchingFields: true }
    }
  }
}
