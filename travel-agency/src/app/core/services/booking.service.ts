import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({ providedIn: 'root' })
export class BookingService {

  constructor(private api: ApiService) {}

  createBooking(tourId: number) {
    return this.api.post('bookings/', {
      tour: tourId
    });
  }

  getMyBookings() {
    return this.api.get('bookings/');
  }
}