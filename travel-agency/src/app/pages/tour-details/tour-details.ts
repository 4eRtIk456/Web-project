import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../core/services/api.service';
import { AuthService } from '../../core/services/auth.service';
import { BookingService } from '../../core/services/booking.service';

@Component({
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './tour-details.html',
  styleUrls: ['./tour-details.css']
})
export class TourDetailsComponent implements OnInit {

  tour: any = null;

  loading = true;
  bookingLoading = false;
  error = '';

  // booking form
  date = '';
  travelers = 2;
  city = 'Almaty';

  cities = ['Almaty', 'Astana', 'Shymkent'];

  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private bookingService: BookingService,
    public auth: AuthService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      this.error = 'Tour ID not found';
      this.loading = false;
      return;
    }

    this.api.get(`tour/${id}/`).subscribe({
      next: (data: any) => {
        this.tour = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Tour load error:', err);
        this.error = 'Failed to load tour';
        this.loading = false;
      }
    });
  }

  book() {

    if (!this.auth.isLoggedIn()) {
      alert('Login first');
      return;
    }

    if (!this.tour?.id) {
      alert('Tour not loaded');
      return;
    }

    this.bookingLoading = true;

    this.bookingService.createBooking(this.tour.id).subscribe({
      next: () => {
        this.bookingLoading = false;
        alert('✅ Booking successful!');
      },
      error: (err) => {
        console.error('Booking error:', err);
        this.bookingLoading = false;
        alert('❌ Booking failed');
      }
    });
  }

}