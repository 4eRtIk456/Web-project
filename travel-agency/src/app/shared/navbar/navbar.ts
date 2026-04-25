import { Component, HostListener } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class NavbarComponent {

  isDropdownOpen = false;
  isMenuOpen = false;

toggleDropdown() {
  this.isDropdownOpen = !this.isDropdownOpen;
  this.isMenuOpen = false;
}

toggleMenu() {
  this.isMenuOpen = !this.isMenuOpen;
  this.isDropdownOpen = false;
}

  closeMenu() {
    this.isMenuOpen = false;
  }

  constructor(public auth: AuthService, private router: Router) {}

  logout() {
    this.auth.logout();
    this.router.navigate(['/']);
    this.isDropdownOpen = false;
  }


  @HostListener('document:click', ['$event'])
  closeDropdown(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('.user-menu')) {
      this.isDropdownOpen = false;
    }
  }

}