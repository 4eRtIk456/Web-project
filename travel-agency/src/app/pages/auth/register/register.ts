import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-register',
  imports: [FormsModule, RouterModule],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class RegisterComponent {

  name = '';
  email = '';
  phone = '';
  password = '';
  confirmPassword = '';
  agree = false;

  error = '';
  loading = false;

  constructor(private auth: AuthService, private router: Router) {}

  onRegister() {
    console.log("STEP 1");
    this.error = '';

    if (!this.name || !this.email || !this.password || !this.confirmPassword) {
      this.error = 'Please fill all fields';
      return;
    }

    console.log("STEP 2: fields OK");

    if (this.password !== this.confirmPassword) {
      this.error = 'Passwords do not match';
      return;
    }

    if (!this.agree) {
      this.error = 'You must agree to terms';
      return;
    }

    console.log("STEP 3: before API call");
    this.loading = true;

    this.auth.register({
      name: this.name,
      email: this.email,
      phone: this.phone,
      password: this.password
    }).subscribe({
      next: () => this.router.navigate(['/login']),
      error: () => {
        this.error = 'Registration failed';
        this.loading = false;
      }
    });
  }
}
