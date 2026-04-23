import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TourService {
  constructor(private api: ApiService) {}

  searchTours(params: any) {
    return this.api.post('tours/search/', params);
  }

  getPopularTours() {
    return of([
      {
        id: 1,
        title: 'Paris Getaway',
        country: 'France',
        price: 1599,
        duration: '7 days',
        image: 'assets/paris.jpg',
        maxPeople: 5
      },
      {
        id: 2,
        title: 'Dubai Luxury',
        country: 'UAE',
        price: 1199,
        duration: '5 days',
        image: 'assets/dubai.jpg',
        maxPeople: 3
      }
    ]);
  }
}