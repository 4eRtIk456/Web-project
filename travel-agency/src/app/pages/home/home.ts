import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ApiService } from '../../core/services/api.service'; 
import { LucideAngularModule } from 'lucide-angular';
import { ChangeDetectorRef } from '@angular/core';

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
    name: 'Aigerim Lavamerka',
    location: 'Almaty, Kazakhstan',
    rating: 5,
    text: 'Pack&Go made our family trip to Turkey absolutely amazing! Everything was organized perfectly, from flights to hotels. Highly recommend!',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aigerim',
  },
  {
    name: 'Alinur Yasha',
    location: 'Astana, Kazakhstan',
    rating: 2,
    text: "The service is complete garbage, I called the number and the operator Alina picked up, I told her that I wanted a vacation like in 1973 when I was young, and she said, <<Can I have more information?>> Listen, I'm going to attack you, you're crazy, threatening people over the phone",
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Dmitry',
  },
  {
    name: 'Sabina the Goddess',
    location: 'Shymkent, Kazakhstan',
    rating: 1,
    text: 'I booked and PAID for a Dubai tour, expecting BUSINESS CLASS and good hotels. Day X comes — at the airport we’re put in ECONOMY (even though BUSINESS was promised). I let it slide. We arrive in Dubai, go to the hotel — it’s TERRIBLE, smells awful, like a dump. Thought the next hotel would be better — NO, all the same cheap 1-star places. My husbands were shocked. I complained, and they tried to SILENCE me with money so I wouldn’t write this review. BUT I WON’T STAY QUIET. DO NOT RECOMMEND. BOYCOTT.',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Gulnar',
  }
];

getStars(count: number) {
  return Array(count).fill(0);
}


  cities = ['Almaty', 'Astana', 'Shymkent'];

  constructor(
    private router: Router,
    private api: ApiService,
    private cdr: ChangeDetectorRef
  ) {}

  loading = true;

  ngOnInit(): void {
    this.api.get('tours/').subscribe({
      next: (data: any) => {
        this.tours = data.slice(0, 3); 
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading tours:', err);
        this.loading = false;
      }
    });
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