import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/home/home').then(m => m.HomeComponent) },
  { path: 'tour/:id', canActivate: [authGuard], loadComponent: () => import('./pages/tour-details/tour-details').then(m => m.TourDetailsComponent) },
  { path: 'tours', loadComponent: () => import('./pages/tours/tours').then(m => m.ToursComponent) },
  { path: 'login', loadComponent: () => import('./pages/auth/login/login').then(m => m.LoginComponent) },
  { path: 'register', loadComponent: () => import('./pages/auth/register/register').then(m => m.RegisterComponent) },
  { path: 'search', loadComponent: () => import('./pages/search-results/search-results').then(m => m.SearchResultsComponent) }
];