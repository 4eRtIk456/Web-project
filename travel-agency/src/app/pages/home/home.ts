import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ApiService } from '../../core/services/api.service'; 
import { LucideAngularModule } from 'lucide-angular';

@Component({
  standalone: true,
  imports: [FormsModule, RouterModule, LucideAngularModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class HomeComponent implements OnInit {

  from = 'Almaty';
  to = '';
  date = '';
  travelers = 2;

  errorMessage = '';

  tours: any[] = [];

  destinations = [
    { name: 'Turkey', price: 899, image: 'assets/turkey.jpg', desc: 'Istanbul & Cappadocia' },
    { name: 'UAE', price: 1299, image: 'assets/uae.jpg', desc: 'Dubai luxury' },
    { name: 'Thailand', price: 1099, image: 'assets/thailand.jpg', desc: 'Tropical paradise' },
    { name: 'Europe', price: 1599, image: 'assets/europe.jpg', desc: 'Historic cities' }
  ];

  offers = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1662653554950-13870f8473fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxFdXJvcGUlMjBQYXJpcyUyMEVpZmZlbCUyMFRvd2VyfGVufDF8fHx8MTc3NjQ5NDAyMXww&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'Paris Getaway',
    destination: 'France, Europe',
    days: '7 days / 6 nights',
    originalPrice: 1999,
    salePrice: 1599,
    discount: '-20%',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1715109862630-9d8c83591d5f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxEdWJhaSUyMFVBRSUyMHNreWxpbmV8ZW58MXx8fHwxNzc2NDk0MDIwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'Dubai Luxury',
    destination: 'UAE, Middle East',
    days: '5 days / 4 nights',
    originalPrice: 1499,
    salePrice: 1199,
    discount: '-20%',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1659698867162-b6dc18792802?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxUdXJrZXklMjBJc3RhbmJ1bCUyMGFyY2hpdGVjdHVyZXxlbnwxfHx8fDE3NzY0OTQwMjB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'Istanbul Explorer',
    destination: 'Turkey',
    days: '6 days / 5 nights',
    originalPrice: 1199,
    salePrice: 899,
    discount: '-25%',
  }
];

  features = [
    {
      icon: 'dollar',
      title: 'Best Prices',
      description: 'Competitive rates and exclusive deals for travelers from Kazakhstan',
    },
    {
      icon: 'shield',
      title: 'Trusted Agency',
      description: 'Licensed and verified travel agency with thousands of satisfied customers',
    },
    {
      icon: 'click',
      title: 'Easy Booking',
      description: 'Simple online booking process with instant confirmation',
    },
    {
      icon: 'support',
      title: '24/7 Support',
      description: 'Round-the-clock customer support in Russian, Kazakh, and English',
    }
  ];

  steps = [
  {
    step: '01',
    icon: 'search',
    title: 'Search',
    description: 'Browse destinations and find your perfect trip from our wide selection',
  },
  {
    step: '02',
    icon: 'card',
    title: 'Book',
    description: 'Secure your spot with easy online payment and instant confirmation',
  },
  {
    step: '03',
    icon: 'plane',
    title: 'Travel',
    description: 'Pack your bags and enjoy your unforgettable adventure with Pack&Go',
  }
];

testimonials = [
  {
    name: 'Айгерим Нұрланқызы',
    location: 'Almaty, Kazakhstan',
    rating: 5,
    text: 'Pack&Go made our family trip to Turkey absolutely amazing! Everything was organized perfectly, from flights to hotels. Highly recommend!',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aigerim',
  },
  {
    name: 'Дмитрий Петров',
    location: 'Astana, Kazakhstan',
    rating: 5,
    text: 'Best travel agency in Kazakhstan! Booked a Dubai package and it exceeded all expectations. Professional service and great prices.',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Dmitry',
  },
  {
    name: 'Гүлнар Сериккызы',
    location: 'Shymkent, Kazakhstan',
    rating: 5,
    text: 'Had an incredible time in Thailand thanks to Pack&Go. The customer support was available 24/7 and helped us with everything we needed.',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Gulnar',
  }
];

getStars(count: number) {
  return Array(count).fill(0);
}


  cities = ['Almaty', 'Astana', 'Shymkent'];

  constructor(
    private router: Router,
    private api: ApiService
  ) {}

  ngOnInit() {
    this.loadTours();
  }

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

  loadTours() {
    this.api.get('tours/').subscribe({
      next: (res: any) => {
        this.tours = res;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  getShortDescription(desc: string): string {
    if (!desc) return '';
    return desc.split('.')[0] + '.';
  }

}