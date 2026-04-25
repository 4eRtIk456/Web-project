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

  saveToken(token: string, remember: boolean = true) {
    if (remember) {
      localStorage.setItem('token', token);
    } else {
      sessionStorage.setItem('token', token);
    }
  }

  getToken(): string | null {
    return localStorage.getItem('token') || sessionStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  saveUser(user: any) {
    let username = user?.username;

    if (!username && user?.email) {
      username = user.email.split('@')[0];
    }

    localStorage.setItem('username', username || 'User');
  }

  getUsername(): string {
    return localStorage.getItem('username') || 'User';
  }
  
  getUserInitial(): string {
    const name = this.getUsername();
    return name.charAt(0).toUpperCase();
  }

  logout() {
    localStorage.clear();
    sessionStorage.clear();
  }
}