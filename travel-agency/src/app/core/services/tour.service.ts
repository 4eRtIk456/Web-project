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
        maxPeople: 5,
        availableDates: [2,4,6,8,10]
      },
      {
        id: 2,
        title: 'Dubai Luxury',
        country: 'UAE',
        price: 1199,
        duration: '5 days',
        image: 'assets/dubai.jpg',
        maxPeople: 3,
        availableDates: [1,3,5,7,9]
      },
      {
        id: 3,
        title: 'Istanbul Explorer',
        country: 'Turkey',
        price: 899,
        duration: '6 days',
        image: 'assets/istanbul.jpg',
        maxPeople: 4,
        availableDates: [2,3,6,7]
      }
    ]);
  }
}