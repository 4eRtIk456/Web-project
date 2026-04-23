import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TourService } from '../../core/services/tour.service';

@Component({
  standalone: true,
  imports: [FormsModule],
  templateUrl: './tours.html',
  styleUrls: ['./tours.css']
})
export class ToursComponent implements OnInit {

  tours: any[] = [];
  filteredTours: any[] = [];

  // filters
  country = '';
  maxPrice = 2000;
  travelers = 1;

  error = '';
  loading = false;

  constructor(private tourService: TourService) {}

  ngOnInit() {
    this.loadTours();
  }

  loadTours() {
    this.loading = true;

    this.tourService.getPopularTours().subscribe({
      next: (data: any) => {
        this.tours = data;
        this.filteredTours = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load tours';
        this.loading = false;
      }
    });
  }

  applyFilters() {
    this.filteredTours = this.tours.filter(tour => {
      return (
        (!this.country || tour.country.toLowerCase().includes(this.country.toLowerCase())) &&
        tour.price <= this.maxPrice &&
        this.travelers <= tour.maxPeople
      );
    });
  }

  viewDetails(tour: any) {
    alert(`Viewing ${tour.title}`);
  }

  bookTour(tour: any) {
    alert(`Booking ${tour.title}`);
  }
}