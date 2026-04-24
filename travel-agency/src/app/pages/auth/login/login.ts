import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import {finalize} from 'rxjs/operators';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {

  email = '';
  password = '';
  remember = false;

  error = '';
  loading = false;

  constructor(private auth: AuthService, private router: Router) {}

  onLogin() {
    if (!this.email || !this.password) {
      this.error = 'Fill all fields';
      return;
    }

    this.loading = true;
    this.error = '';

    this.auth.login({
      email: this.email,
      password: this.password
    }).subscribe({
      next: (res: any) => {
        console.log('SUCCESS:', res);

        this.loading = false;
        this.auth.saveToken(res.access);
        this.router.navigate(['/']);
      },

      error: (err) => {
        console.log('LOGIN ERROR FULL:', err);

        this.loading = false;

        this.error =
          err?.error?.error ||
          err?.error?.detail ||
          'Invalid email or password';
      }
    });
  }
}