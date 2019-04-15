import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError as observableThrowError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ErrorModel } from '../model/common.model';
import { GlobalConstants } from '../model/global-constants';
import { CustomCookieService } from './cookie.service';


@Injectable()
export class HttpService {
    constructor(
        private http: HttpClient,
        private customCookieService: CustomCookieService
    ) { }

    get<TReturn>(apiPath: string, searchParams?: any): Observable<any> {
        const options: any = {
            headers: this.getDefaultRequestHeaders(),
            search: searchParams
        };
        return this.http.get(GlobalConstants.Host + apiPath, options).pipe(
            map(this.extractData),
            catchError(this.handleError));
    }

    post<TReturn>(apiPath: string, requestObject: Object, options?: any): Observable<TReturn> {

        if (options === undefined || options == null) {
            options = {
                headers: this.getDefaultRequestHeaders()
            };
        }

        return this.http.post(GlobalConstants.Host + apiPath, this.DeepTrim(requestObject), options).pipe(
            map(this.extractData), catchError(this.handleError));
    }


    put<TReturn>(apiPath: string, putObject?: Object, options?: any): Observable<TReturn> {
        if (options === undefined || options == null) {
            options = {
                headers: this.getDefaultRequestHeaders()
            };
        }
        return this.http.put(GlobalConstants.Host + apiPath, this.DeepTrim(putObject), options).pipe(
            map(this.extractData),
            catchError(this.handleError));
    }



    getDefaultRequestHeaders(): HttpHeaders {
        const token = this.customCookieService.getCookie(GlobalConstants.CookieKeys.Token);

        const ConsumerInfoModel = this.customCookieService.getCookie(GlobalConstants.CookieKeys.Token);
        let headers = new HttpHeaders({
            'Content-Type': GlobalConstants.HeaderValues.ApplicationJSON,
        });
        if (token) {
            headers = headers.set(
                'Authorization', 'Bearer ' + token
            );
        }
        return headers;
    }

    DeepTrim(obj) {
        for (const prop in obj) {
            if (obj.hasOwnProperty(prop)) {
                const value = obj[prop], type = typeof value;
                if (value != null && (type === 'string' || type === 'object') && obj.hasOwnProperty(prop)) {
                    if (type === 'object') {
                        this.DeepTrim(obj[prop]);
                    } else {
                        obj[prop] = obj[prop].trim();
                    }
                }
            }
        }
        return obj;
    }


    private extractData(res: any): any {
        if (res === null) {
            return [];
        } else {
            const body: any = res;
            return body || {};
        }
    }

    private handleError(error: any) {
        // console.warn(error);
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        // checking if usr is logged in or not. If not then do not redirect. if yes then redirect
        // const token = JSON.parse(this.customCookieService.getCookie('ad-angular-token'));
        // if (error.status === 401 && token !== undefined && token !== '' && token !== null) {
        //     window.location.href = '/auth/login';
        //     return observableThrowError(error.status);
        // }
        const errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';

        if ((error.status === 400 || error.status === 401) && error.hasOwnProperty('error')) {
            return observableThrowError(error.error);
        } else if (error.status === 503) {
            const errorData: ErrorModel = { status: false, message: 'Service Not Available' };
            return observableThrowError(errorData);
        } else if (error.status === 0) {
            const errorData: ErrorModel = { status: false, message: 'Internet Not Connect' };
            return observableThrowError(errorData);
        }
        return observableThrowError(error._body);
    }
}
