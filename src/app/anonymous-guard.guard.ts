import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AnonymousGuardGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const isLoggedIn: boolean = this.authService.isLoggedIn;
    if (isLoggedIn) {
        this.router.navigate(['/user/dashboard']);
    }
    return true;
  }

}
