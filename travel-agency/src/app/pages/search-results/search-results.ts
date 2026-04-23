import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TourService } from '../../core/services/tour.service';

@Component({
  standalone: true,
  templateUrl: './search-results.html',
  styleUrls: ['./search-results.css']
})
export class SearchResultsComponent implements OnInit {

  tours: any[] = [];
  filteredTours: any[] = [];

  loading = false;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private tourService: TourService
  ) {}

  ngOnInit() {
    const params = this.route.snapshot.queryParams;

    const from = params['from'];
    const to = params['to'];
    const date = params['date'];
    const travelers = Number(params['travelers']);

    const day = new Date(date).getDate();

    this.loadTours(from, to, day, travelers);
  }

  loadTours(from: string, to: string, day: number, travelers: number) {
    this.loading = true;

    this.tourService.getPopularTours().subscribe({
      next: (data: any[]) => {
        this.tours = data;

        const isEven = day % 2 === 0;

        this.filteredTours = this.tours.filter(tour => {

          // even / odd logic
          const validDate = tour.availableDates.some((d: number) =>
            isEven ? d % 2 === 0 : d % 2 !== 0
          );

          return (
            tour.country.toLowerCase().includes(to.toLowerCase()) &&
            validDate &&
            travelers <= tour.maxPeople
          );
        });

        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load search results';
        this.loading = false;
      }
    });
  }

  book(tour: any) {
    alert(`Booked ${tour.title}`);
  }
}