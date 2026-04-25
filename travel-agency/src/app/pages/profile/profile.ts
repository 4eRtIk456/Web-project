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

  bookings: any[] = [];

  constructor(private auth: AuthService) {
    this.user.username = this.auth.getUsername();
    this.user.email = this.auth.getEmail();
  }

  getInitial() {
    return this.user.username.charAt(0).toUpperCase();
  }
}