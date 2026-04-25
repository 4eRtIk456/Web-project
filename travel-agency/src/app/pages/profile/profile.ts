import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-profile',
  imports: [CommonModule],
  templateUrl: './profile.html',
  styleUrls: ['./profile.css']
})
export class ProfileComponent {

  user = {
    username: '',
    email: ''
  };

  bookings = [
    {
      title: 'Dubai Luxury',
      date: '2026-06-10',
      status: 'Confirmed'
    },
    {
      title: 'Istanbul Explorer',
      date: '2026-07-05',
      status: 'Pending'
    }
  ];

  constructor(private auth: AuthService) {
    this.user.username = this.auth.getUsername();
    this.user.email = 'example@email.com'; 
  }

  getInitial() {
    return this.user.username.charAt(0).toUpperCase();
  }
}