import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  imports: [FormsModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})

export class HomeComponent {

  from = 'Almaty';
  to = '';
  date = '';
  travelers = 2;

  errorMessage = '';

  // 👇 список городов
  cities = ['Almaty', 'Astana', 'Shymkent'];

  constructor(private router: Router) {}

  search() {
    if (!this.from || !this.to || !this.date) {
      this.errorMessage = 'Please fill all fields';
      return;
    }

    this.router.navigate(['/search'], {
      queryParams: {
        from: this.from,
        to: this.to,
        date: this.date,
        travelers: this.travelers
      }
    });
  }
}