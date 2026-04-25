import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [FormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {

  email = '';
  password = '';
  remember = false;

  error = '';
  loading = false;

  constructor(
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

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
        this.loading = false;

        this.auth.saveToken(res.access, this.remember);
        this.auth.saveUser(res.user || { email: this.email });

        const returnUrl =
          this.route.snapshot.queryParams['returnUrl'] || '/';

        this.router.navigate([returnUrl]);
      },

      error: (err) => {
        this.loading = false;

        this.error =
          err?.error?.error ||
          err?.error?.detail ||
          'Invalid email or password';
      }
    });
  }
}