import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-google-dashboard',
  templateUrl: './google-dashboard.component.html',
  styleUrls: ['./google-dashboard.component.css'],
})

export class GoogleDashboardComponent implements OnInit {
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
    const googleStorage = localStorage.getItem('google_auth');
    if (googleStorage) {
      this.userDetails = JSON.parse(googleStorage);
      console.log(this.userDetails);
    } else {
      this.signOut();
    }
  }

  signOut(): void {
    localStorage.removeItem('google_auth');
    this.router.navigateByUrl('/login').then();
  }
}
