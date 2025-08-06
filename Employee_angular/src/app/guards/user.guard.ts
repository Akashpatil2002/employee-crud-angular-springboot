// src/app/guards/user.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserGuard implements CanActivate {
  constructor(private router: Router) { }

  canActivate(): boolean {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
    const role = sessionStorage.getItem('role');

    if (isLoggedIn && role === 'user') {
      return true;
    } else {
      this.router.navigate(['/login']); // Redirect to login if not valid
      return false;
    }
  }
}
