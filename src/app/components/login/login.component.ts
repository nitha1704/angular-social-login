import { renderFlagCheckIfStmt } from '@angular/compiler/src/render3/view/template';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FacebookLoginProvider,
  GoogleLoginProvider,
  SocialAuthService,
} from 'angularx-social-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private router: Router, private authService: SocialAuthService) {}

  ngOnInit(): void {
    const googleStorage = localStorage.getItem('google_auth');
    const facebookStorage = localStorage.getItem('facebook_auth');

    if (googleStorage) {
      this.router.navigateByUrl('/googleDashboard').then();
    }

    if (facebookStorage) {
      this.router.navigateByUrl('/facebookDashboard').then();
    }
  }

  signInWithGoogle() {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then((data) => {
      localStorage.setItem('google_auth', JSON.stringify(data));
      this.router.navigateByUrl('/googleDashboard');
    });
  }

  signInWithFacebook() {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then((data) => {
      localStorage.setItem('facebook_auth', JSON.stringify(data));
      this.router.navigateByUrl('/facebookDashboard');
    });
  }
}
