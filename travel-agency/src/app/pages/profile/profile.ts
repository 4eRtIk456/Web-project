import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { ApiService } from '../../core/services/api.service';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-profile',
  imports: [CommonModule],
  templateUrl: './profile.html',
  styleUrls: ['./profile.css']
})
export class ProfileComponent implements OnInit {

  user = {
    username: '',
    email: ''
  };

  bookings: any[] = [];

  constructor(
    private auth: AuthService,
    private api: ApiService
  ) {}

  ngOnInit() {
    // USER
    this.user.username = this.auth.getUsername();
    this.user.email = this.auth.getEmail();

    // BOOKINGS
    this.api.get('bookings/').subscribe({
      next: (data: any) => {
        console.log('BOOKINGS:', data);
        this.bookings = data;
      },
      error: (err) => {
        console.log('ERROR BOOKINGS:', err);
      }
    });
  }

  getInitial() {
    return this.user.username
      ? this.user.username.charAt(0).toUpperCase()
      : 'U';
  }
}