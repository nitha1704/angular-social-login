import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

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

  userForm:any = FormGroup;
  isSubmitComplete: boolean = false;
  isTooltipsBoxShow: boolean = false;
  tooltipsBoxMsg: string = "qsdzx";

  constructor(private router: Router, private authService: SocialAuthService) {}

  ngOnInit(): void {
    // Form
    this.userForm = new FormGroup({
      'email': new FormControl('', [Validators.required, Validators.email]),
      'password': new FormControl('', [Validators.required, Validators.minLength(6)])
    });


    // Local Storage
    const googleStorage = localStorage.getItem('google_auth');
    const facebookStorage = localStorage.getItem('facebook_auth');
    if (googleStorage) {
      this.router.navigateByUrl('/googleDashboard');
    }
    if (facebookStorage) {
      this.router.navigateByUrl('/facebookDashboard');
    }
  }


  // Method
  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then((data) => {
      localStorage.setItem('google_auth', JSON.stringify(data));
      localStorage.setItem('user_id_google', JSON.stringify(data.authToken));
      this.router.navigateByUrl('/googleDashboard');
    });
  }

  signInWithFacebook(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then((data) => {
      localStorage.setItem('facebook_auth', JSON.stringify(data));
      localStorage.setItem('user_id_facebook', JSON.stringify(data.authToken));
      this.router.navigateByUrl('/facebookDashboard');
    });
  }

  handleSubmit():void {
    if (this.userForm.status === 'INVALID'){
     this.userForm.markAllAsTouched();
     this.isTooltipsBoxShow = true;
     this.isSubmitComplete = false;
     this.tooltipsBoxMsg = 'Please fill your information.';
    } else if (this.userForm.status === 'VALID') {

      localStorage.setItem('userId', this.userForm.value.email);
      this.isTooltipsBoxShow = true;
      this.isSubmitComplete = true;
      this.tooltipsBoxMsg = 'Successfully login!';
    }
  }

  
}
