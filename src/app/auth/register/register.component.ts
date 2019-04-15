import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SubscriptionLike as ISubscription } from 'rxjs';
import { ErrorModel, ResponseModel } from 'src/app/common/model/common.model';
import { GlobalConstants } from 'src/app/common/model/global-constants';
import { UserModel } from '../models/user.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  registerForm: FormGroup;

  isFormSubmitted = false;

  SubmitSubscribe: ISubscription;

  hasError = false;
  isLoading = false;
  errorMessage = '';

  PhoneRgex = GlobalConstants.PhoneRgex;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private datePipe: DatePipe,
    private router: Router
  ) {
    this.buildForm();
  }

  buildForm() {
    this.registerForm = this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      gender: ['', Validators.required],
      dob: [new Date().toString(), Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      password_confirmation: ['', Validators.required]
    });
  }


  mobileNumberValidation(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode !== 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  validatePassword() {
    if (this.registerForm.value.password_confirmation !== '') {
      if (this.registerForm.value.password_confirmation.trim() !== this.registerForm.value.password.trim()) {
        this.registerForm.controls['password_confirmation'].setErrors({ 'passwordsNotMatch': true });
      } else {
        this.registerForm.controls['password_confirmation'].setErrors(null);
      }
    }
  }

  get f() { return this.registerForm.controls; }


  onSubmit() {

    this.isFormSubmitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    this.isLoading = true;
    this.hasError = false;

    const registerDataForm: UserModel = Object.assign(this.registerForm.getRawValue());

    registerDataForm.dob = this.datePipe.transform(registerDataForm.dob, 'yyyy-MM-dd');

    this.SubmitSubscribe = this.authService.register(registerDataForm)
      .subscribe((response: ResponseModel) => {
        this.isFormSubmitted = false;

        let expirationHours = 720;
        expirationHours = (1 * expirationHours) / 24;

        this.authService.setIsLoggedInValue(true);
        this.authService.saveToken(response.token, expirationHours);
        this.isLoading = false;
        this.hasError = false;
        this.router.navigateByUrl('/' + GlobalConstants.Routes.user + '/' + GlobalConstants.Routes.UserDashboard);
      }, (err: ErrorModel) => {
        this.isLoading = false;
        this.hasError = true;
        this.isFormSubmitted = false;
        this.errorMessage = err.message;
        console.log('Error => ', err);
      });
  }

}
