import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  subscription: Subscription;

  isLoggedIn = false;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
    this.isLoggedIn = this.authService.isLoggedIn;
  }

  ngOnInit() {
    this.authService.showLoginNotificationUiObservable$.subscribe((val) => {
      this.isLoggedIn = val;
    });
  }

  signOut() {
    this.authService.setIsLoggedInValue(false);
    this.authService.signOut();
  }

}
