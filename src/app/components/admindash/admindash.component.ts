import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admindash',
  templateUrl: './admindash.component.html',
  styleUrls: ['./admindash.component.css']
})
export class AdmindashComponent {
  constructor(private router: Router) { }

  logout() {
    sessionStorage.clear(); 
    this.router.navigate(['/login']); 
  }
}
