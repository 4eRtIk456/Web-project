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

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  logout() {
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    if (typeof window === 'undefined') return false;
    return !!localStorage.getItem('token');
  }
}
