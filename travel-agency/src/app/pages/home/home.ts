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

  destinations = [
    { name: 'Turkey', price: 899, image: 'assets/turkey.jpg', desc: 'Istanbul & Cappadocia' },
    { name: 'UAE', price: 1299, image: 'assets/uae.jpg', desc: 'Dubai luxury' },
    { name: 'Thailand', price: 1099, image: 'assets/thailand.jpg', desc: 'Tropical paradise' },
    { name: 'Europe', price: 1599, image: 'assets/europe.jpg', desc: 'Historic cities' }
  ];

  offers = [
    { title: 'Paris Getaway', price: 1599, old: 1999, discount: 20, image: 'assets/paris.jpg' },
    { title: 'Dubai Luxury', price: 1199, old: 1499, discount: 20, image: 'assets/dubai.jpg' },
    { title: 'Istanbul Explorer', price: 899, old: 1199, discount: 25, image: 'assets/istanbul.jpg' }
  ];

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