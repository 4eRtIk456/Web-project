import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({ providedIn: 'root' })
export class AuthService {

  constructor(private api: ApiService) {}

  register(data: any) {
    return this.api.post('register/', data);
  }

  login(data: any) {
    return this.api.post('auth/login/', data);
  }

  getToken(): string | null {
    if (typeof window === 'undefined') return null;

    return localStorage.getItem('token') ||
          sessionStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  getUsername(): string {
    if (typeof window === 'undefined') return 'User';

    return localStorage.getItem('username') || 'User';
  }

  saveToken(token: string, remember: boolean = true) {
    if (typeof window === 'undefined') return;

    if (remember) {
      localStorage.setItem('token', token);
    } else {
      sessionStorage.setItem('token', token);
    }
  }

  saveUser(user: any) {
    if (typeof window === 'undefined') return;

    let username = user?.username;
    let email = user?.email;

    if (!username && email) {
      username = email.split('@')[0];
    }

    localStorage.setItem('username', username || 'User');
    localStorage.setItem('email', email || '');
  }

  getEmail(): string {
    if (typeof window === 'undefined') return '';

    return localStorage.getItem('email') || '';
  }

  logout() {
    if (typeof window === 'undefined') return;

    localStorage.clear();
    sessionStorage.clear();
  }

  getUserInitial(): string {
    const name = this.getUsername();
    return name.charAt(0).toUpperCase();
  }


}