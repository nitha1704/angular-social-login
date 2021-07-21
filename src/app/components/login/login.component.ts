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

  name: string = '';

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

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then((data) => {
      localStorage.setItem('google_auth', JSON.stringify(data));
      this.router.navigateByUrl('/googleDashboard');
    });
  }

  signInWithFacebook(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then((data) => {
      localStorage.setItem('facebook_auth', JSON.stringify(data));
      this.router.navigateByUrl('/facebookDashboard');
    });
  }

  onSubmit(event: any): void {
    console.log(event);
  }
}
