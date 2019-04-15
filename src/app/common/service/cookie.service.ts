import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class CustomCookieService {

  private _cookiePath = '/';

  constructor(private cookieService: CookieService) { }

  createCookie(name: string, value: string | object, expires?: number | Date): void {
    if (this.cookieService.check(name)) {
      this.deleteCookie(name);
    }
    let cookieValue = '';
    if (!(value instanceof String)) {
      cookieValue = JSON.stringify(value);
    }
    this.cookieService.set(name, cookieValue, expires, '/');
  }

  deleteCookie(name: string): void {
    if (this.cookieService.check(name)) {
      this.cookieService.delete(name, '/');
    }
  }

  deleteAllCookies(): void {
    const cookies: any = this.cookieService.getAll();
    this.cookieService.deleteAll('/');
  }

  getCookie<T>(name: string): T {
    if (this.cookieService.check(name)) {
      const value = this.cookieService.get(name);
      if (value === undefined || value == null || value === '') {
        return null;
      }
      const jsonObject: T = JSON.parse(value);
      return jsonObject;
    }
    return null;
  }
}
