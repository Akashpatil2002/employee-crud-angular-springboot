import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';
import Swal from 'sweetalert2';

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

  // Static forcefully data add
  // username = '';
  // password = '';

  // constructor(private router: Router) { }

  // sendData() {
  //   if (this.username === 'admin' && this.password === 'admin123') {
  //     sessionStorage.setItem('isLoggedIn', 'true');
  //     sessionStorage.setItem('role', 'admin');
  //     this.router.navigate(['/admindash']);  //OR
  //     // this.router.navigateByUrl('/admindash');
  //   }
  //   else if (this.username === 'user' && this.password === 'user123') {
  //     sessionStorage.setItem('isLoggedIn', 'true');
  //     sessionStorage.setItem('role', 'user'); 
  //     this.router.navigate(['/userdash']);
  //   }
  //   else {
  //     alert('Invalid username or password!');
  //   }
  // }

  // Dynamic Login Sir
  // constructor(private service: ApiServiceService) { }
  // loginUser = {
  //   email: '',
  //   password: ''
  // }
  // sendData() {
  //   this.service.sendData(this.loginUser).subscribe(res => {
  //     console.log(res);
  //   })
  // }




  // loginUser = {
  //   username: '',
  //   password: ''
  // };

  // errorMsg: string = '';

  // constructor(private service: ApiServiceService, private router: Router) { }

  // sendData() {
  //   this.service.sendData(this.loginUser).subscribe({
  //     next: (res) => {
  //       console.log('Login Success:', res);
  //       this.errorMsg = '';

  //       this.router.navigate(['/userdash']).then(success => {
  //         if (success) {
  //           console.log('Navigation successful!');
  //         } else {
  //           console.log('Navigation failed.');
  //         }
  //       });
  //     },
  //     error: (err) => {
  //       console.error('Login Failed:', err);
  //       if (err.status === 401) {
  //         this.errorMsg = 'Invalid username or password';
  //       } else {
  //         this.errorMsg = 'Something went wrong. Please try again.';
  //       }
  //     }
  //   });
  // }





  loginUser = {
    email: '',
    password: ''
  };

  loginMsg: string = '';
  msgColor: string = '';

  constructor(private service: EmployeeService, private router: Router) { }


  // Sir
  //  sendData() {
  //   this.service.sendData(this.loginUser).subscribe(res => {
  //     if (res != null) {
  //       this.router.navigateByUrl('/userdash');
  //     } else {
  //     alert("Invalid Credentials");
  //     }
  //   })
  // }

  // ----------NEW------------
  // sendData() {
  //   this.service.sendData(this.loginUser).subscribe({
  //     next: (res) => {
  //       console.log('Login Success:', res);

  //       this.loginMsg = '✅ Login Successful!';
  //       this.msgColor = 'green';

  //       setTimeout(() => {
  //         this.router.navigate(['/admindash']).then(success => {
  //           if (success) {
  //             console.log('Navigation successful!');
  //           } else {
  //             console.log('Navigation failed.');
  //           }
  //         });
  //       }, 1000);  // 3-second delay
  //     },
  //     error: (err) => {
  //       console.error('Login Failed:', err);

  //       if (err.status === 401) {
  //         this.loginMsg = '❌ Invalid username or password';
  //       } else {
  //         this.loginMsg = '❌ Something went wrong. Please try again.';
  //       }

  //       this.msgColor = 'red';
  //     }
  //   });
  // }

  sendData() {
    this.service.sendData(this.loginUser).subscribe({
      next: (res) => {
        console.log('Login Success:', res);

        Swal.fire({
          icon: 'success',
          title: 'Login!',
          text: '✅ Employee Login Successful!',
          showConfirmButton: true,
          confirmButtonText: 'OK',
          confirmButtonColor: '#28a745',
          timerProgressBar: true,
          timer: 1500
        });

        setTimeout(() => {
          this.router.navigate(['/admindash']).then(success => {
            if (success) {
              console.log('Navigation successful!');
            } else {
              console.log('Navigation failed.');
            }
          });
        }, 1500);
      },
      error: (err) => {
        console.error('Login Failed:', err);

        if (err.status === 401) {
          Swal.fire({
            icon: 'error',
            title: '❌ Invalid username or password',
            confirmButtonColor: '#d33'
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: '❌ Something went wrong. Please try again.',
            confirmButtonColor: '#d33'
          });
        }
      }
    });
  }

  

}
