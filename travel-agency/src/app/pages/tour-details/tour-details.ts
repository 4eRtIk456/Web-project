import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [FormsModule],
  templateUrl: './tour-details.html',
  styleUrls: ['./tour-details.css']
})
export class TourDetailsComponent implements OnInit {

  tour: any;

  date = '';
  travelers = 2;
  city = 'Almaty';

  cities = ['Almaty', 'Astana', 'Shymkent'];

  ngOnInit() {
    this.tour = {
      title: 'Istanbul & Cappadocia Explorer',
      country: 'Turkey',
      duration: '6 days / 5 nights',
      price: 899,
      oldPrice: 1199,
      people: '2-15',
      rating: 4.8,
      reviews: 127,
      image: 'assets/istanbul.jpg',

      highlights: [
        'Blue Mosque and Hagia Sophia tours',
        'Bosphorus cruise',
        'Underground cities exploration',
        'Grand Bazaar shopping experience',
        'Hot air balloon ride in Cappadocia',
        'Traditional Turkish cuisine'
      ],

      included: [
        'Round-trip flights',
        '4-star hotel',
        'Breakfast & dinners',
        'Transfers',
        'English guide',
        'Entrance tickets'
      ],

      gallery: [
        'assets/istanbul1.jpg',
        'assets/istanbul2.jpg'
      ]
    };
  }

  book() {
    alert('Booking confirmed');
  }
}