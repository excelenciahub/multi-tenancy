import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { GlobalConstants } from 'src/app/common/model/global-constants';
import { CustomCookieService } from 'src/app/common/service/cookie.service';
import { HttpService } from 'src/app/common/service/http.service';
import { LoginModel, UserModel } from '../models/user.model';

@Injectable()
export class AuthService {

    private showLoginNotification = new Subject<any>();
    showLoginNotificationUiObservable$ = this.showLoginNotification.asObservable();

    constructor(
        private router: Router,
        private customCookieService: CustomCookieService,
        private httpService: HttpService
    ) { }

    get isLoggedIn(): boolean {
        const token = this.getToken();
        return (token !== undefined && token !== '' && token !== null);
    }

    getToken() {
        return this.customCookieService.getCookie(GlobalConstants.CookieKeys.Token);
    }

    saveToken(token: string, expirationHours?: number) {
        this.customCookieService.createCookie(GlobalConstants.CookieKeys.Token, token, expirationHours);
    }

    signOut() {
        localStorage.clear();
        this.customCookieService.deleteAllCookies();
        this.router.navigate(['/' + GlobalConstants.Routes.auth + '/' + GlobalConstants.Routes.login]);
    }

    register(user: UserModel): Observable<any> {
        return this.httpService.post<Response>(GlobalConstants.ApiPath.Auth.Regisiter, user);
    }

    login(user: LoginModel): Observable<any> {
        return this.httpService.post<Response>(GlobalConstants.ApiPath.Auth.Login, user);
    }

    setIsLoggedInValue(val) {
        this.showLoginNotification.next(val);
    }
}
