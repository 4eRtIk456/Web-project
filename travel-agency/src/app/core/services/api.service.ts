import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:8000/api';

  get(url: string) {
    return this.http.get(`${this.baseUrl}/${url}`);
  }

  post(url: string, data: any) {
    return this.http.post(`${this.baseUrl}/${url}`, data);
  }
}
