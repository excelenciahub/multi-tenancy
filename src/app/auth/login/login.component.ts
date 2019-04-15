import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SubscriptionLike as ISubscription } from 'rxjs';
import { ErrorModel, ResponseModel } from 'src/app/common/model/common.model';
import { GlobalConstants } from 'src/app/common/model/global-constants';
import { LoginModel } from '../models/user.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm: FormGroup;
  loginData: LoginModel = new LoginModel({});
  isFormSubmitted = false;

  SubmitSubscribe: ISubscription;

  hasError = false;
  isLoading = false;
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.buildForm();
  }

  buildForm() {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.isFormSubmitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.isLoading = true;
    this.hasError = false;

    const loginFormData: LoginModel = Object.assign(this.loginForm.value);

    this.SubmitSubscribe = this.authService.login(loginFormData)
      .subscribe((response: ResponseModel) => {

        this.authService.setIsLoggedInValue(true);

        this.isFormSubmitted = false;
        let expirationHours = 720;
        expirationHours = (1 * expirationHours) / 24;


        this.authService.saveToken(response.token, expirationHours);
        this.isLoading = false;
        this.hasError = false;
        this.router.navigateByUrl('/' + GlobalConstants.Routes.user + '/' + GlobalConstants.Routes.UserDashboard);
      }, (err: ErrorModel) => {
        this.isLoading = false;
        this.hasError = true;
        this.errorMessage = err.message;
        console.log('Error => ', err);
        this.isFormSubmitted = false;
      });

  }

}
