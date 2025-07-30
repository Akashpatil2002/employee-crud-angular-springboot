import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-userdash',
  templateUrl: './userdash.component.html',
  styleUrls: ['./userdash.component.css']
})
export class UserdashComponent {
  constructor(private router: Router) { }

  logout() {
    sessionStorage.clear(); // or removeItem('isLoggedIn') & removeItem('role')
    this.router.navigate(['/login']);
  }
}
