import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent {

  constructor(private router: Router) { }

  logout(): void {
    // Add your logout logic here
    // For example, clear user session and navigate to login page
    this.router.navigate(['/login']);
  }
}
