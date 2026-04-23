import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/navbar/navbar';
import { Footer } from './shared/footer/footer';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, Footer],
  template: `
    <app-navbar></app-navbar>
    <router-outlet></router-outlet>
    <app-footer></app-footer>
  `
})
export class AppComponent {}