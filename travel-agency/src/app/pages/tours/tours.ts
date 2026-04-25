import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../core/services/api.service';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './tours.html',
  styleUrls: ['./tours.css']
})
export class ToursComponent implements OnInit {

  tours: any[] = [];
  filteredTours: any[] = [];

  // filters
  country = '';
  maxPrice = 5000;
  travelers = 1;

  error = '';

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.api.get('tours/').subscribe({
      next: (data: any) => {
        this.tours = data;
        this.filteredTours = data;
      },
      error: () => {
        this.error = 'Failed to load tours';
      }
    });
  }

  applyFilters() {
    this.filteredTours = this.tours.filter(tour => {
      return (
        (!this.country || tour.country.toLowerCase().includes(this.country.toLowerCase())) &&
        tour.price <= this.maxPrice &&
        this.travelers <= tour.max_people
      );
    });
  }

}