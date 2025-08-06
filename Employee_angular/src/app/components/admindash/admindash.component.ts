import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admindash',
  templateUrl: './admindash.component.html',
  styleUrls: ['./admindash.component.css']
})
export class AdmindashComponent {
  constructor(private router: Router) { }

  // logout() {
  //   sessionStorage.clear();
  //   this.router.navigate(['/login']);
  // }

  logout() {
    Swal.fire({
      title: 'Are you sure you want to logout?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Yes, Logout',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        sessionStorage.clear();

        Swal.fire({
          title: 'Logged Out',
          text: 'You have been successfully logged out.',
          icon: 'success',
          showConfirmButton: false,
          timer: 1000
        });

        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 1500); // Delay redirect until after SweetAlert is done
      }
    });
  }


}
