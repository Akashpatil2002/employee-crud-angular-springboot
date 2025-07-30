import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  // username='';
  // password='';

  // sendData(){
  //   alert(this.username)
  //   alert(this.password)
  // }


  username = '';
  password = '';

  constructor(private router: Router) { }

  sendData() {
    if (this.username === 'admin' && this.password === 'admin123') {
      sessionStorage.setItem('isLoggedIn', 'true');
      sessionStorage.setItem('role', 'admin');
      this.router.navigate(['/admindash']);  //OR
      // this.router.navigateByUrl('/admindash');
    }
    else if (this.username === 'user' && this.password === 'user123') {
      sessionStorage.setItem('isLoggedIn', 'true');
      sessionStorage.setItem('role', 'user'); 
      this.router.navigate(['/userdash']);
    }
    else {
      alert('Invalid username or password!');
    }
  }
}
