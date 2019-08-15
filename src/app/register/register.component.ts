import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private authService: AuthService,
    private formBuilder: FormBuilder
  ) { }

  registerForm: FormGroup;
  registerUser: any = {}

  ngOnInit() {
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.maxLength(30)]],
      password: ["", [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
      confirmPassword: ["", Validators.required],
      firstName: ["", [Validators.required, Validators.maxLength(30)]],
      lastName: ["", [Validators.required, Validators.maxLength(30)]],
      birthDate: ["", Validators.required]
    },
      { validator: this.matchingFields('password', 'confirmPassword') }
    )
  }

  register() {
    if (this.registerForm.valid) {
      this.registerUser = Object.assign({}, this.registerForm.value);
      this.authService.register(this.registerUser);
    }
  }

  matchingFields(field1, field2) {
    return form => {
      if (form.controls[field1].value !== form.controls[field2].value)
        return { matchingFields: true }
    }
  }

}
