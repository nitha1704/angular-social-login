import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-facebook-dashboard',
  templateUrl: './facebook-dashboard.component.html',
  styleUrls: ['./facebook-dashboard.component.css'],
})
export class FacebookDashboardComponent implements OnInit {
  userDetails = {
    id: '',
    photoUrl: '',
    name: '',
    email: '',
    provider: '',
    idToken: '',
    authToken: '',
  };

  constructor(private router: Router) {}

  ngOnInit(): void {
    const facebookStorage = localStorage.getItem('facebook_auth');
    if (facebookStorage) {
      this.userDetails = JSON.parse(facebookStorage);
      console.log(this.userDetails);
    } else {
      this.signOut();
    }
  }

  signOut(): void {
    localStorage.removeItem('facebook_auth');
    this.router.navigateByUrl('/login').then();
  }
}

