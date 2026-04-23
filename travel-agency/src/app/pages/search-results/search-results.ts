import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TourService } from '../../core/services/tour.service';

@Component({
  standalone: true,
  template: `
    <h2>Search Results</h2>

    @for (tour of filteredTours; track tour.id) {
      <div class="card">
        <h3>{{ tour.title }}</h3>
        <p>{{ tour.price }}</p>
      </div>
    }
  `
})
export class SearchResultsComponent implements OnInit {
  tours: any[] = [];
  filteredTours: any[] = [];

  constructor(private route: ActivatedRoute, private tourService: TourService) {}

  ngOnInit() {
    const params = this.route.snapshot.queryParams;

    this.tourService.searchTours(params).subscribe({
      next: (data: any) => {
        this.tours = data;

        const day = Number(params['day']);
        const travelers = Number(params['travelers']);

        this.filteredTours = this.tours.filter(tour => {
          const isEven = day % 2 === 0;

          const validDate = isEven
            ? tour.availableDates.some((d: number) => d % 2 === 0)
            : tour.availableDates.some((d: number) => d % 2 !== 0);

          return validDate && travelers <= tour.maxPeople;
        });
      },
      error: () => {
        alert('Failed to load tours');
      }
    });
  }
}