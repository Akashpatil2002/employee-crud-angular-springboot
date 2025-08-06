import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  //   regis = new FormGroup({
  //     name: new FormControl('', [Validators.required, Validators.minLength(10)]),
  //     email: new FormControl('', [
  //       Validators.required,
  //       Validators.pattern(/^(?=.*\d)[a-zA-Z0-9._%+-]+@gmail\.com$/)
  //     ]),
  //     password: new FormControl('', [
  //       Validators.required,
  //       Validators.pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
  //     ])
  //   });

  //   ngOnInit(): void {
  //   this.regis.get('name')?.statusChanges.subscribe(status => {
  //     console.log('Name validation status:', status);
  //   });

  //   this.regis.get('email')?.statusChanges.subscribe(status => {
  //     console.log('Email validation status:', status);
  //   });

  //   this.regis.get('password')?.statusChanges.subscribe(status => {
  //     console.log('Password validation status:', status);
  //   });
  // }

  regis = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.pattern(/^[A-Z][a-zA-Z\s]+$/)
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[a-zA-Z0-9._%+-]*\d+[a-zA-Z0-9._%+-]*@gmail\.com$/)
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/)
    ])

  });




  message: string = '';
  messageColor: string = '';

  register() {
    console.log(this.regis.value);
  }

  // registerData() {
  //   if (this.regis.valid) {
  //     fetch('http://localhost:8080/register', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify(this.regis.value)
  //     })
  //       .then(response => {
  //         if (!response.ok) {
  //           throw new Error('Failed to save data');
  //         }
  //         return response.json();
  //       })
  //       .then(data => {
  //         this.message = '✅ Registration Successfully Done';
  //         this.messageColor = 'green';

  //         this.regis.reset();
  //       })
  //       .catch(error => {
  //         this.message = '❌ Registration Failed. Please try again.';
  //         this.messageColor = 'red';
  //         console.error('Error:', error);
  //       });
  //   } else {
  //     this.regis.markAllAsTouched();
  //     this.message = '⚠️ Please fill all fields correctly.';
  //     this.messageColor = 'orange';
  //   }
  // }



  constructor(private service: EmployeeService, private router: Router) { }

  // registerData() {
  //   if (this.regis.valid) {
  //     this.service.registerUser(this.regis.value).subscribe({
  //       next: (res) => {
  //         this.message = '✅ Registration Successfully Done';
  //         this.messageColor = 'green';
  //         this.regis.reset();

  //         setTimeout(() => {
  //           this.router.navigateByUrl('/login');
  //         }, 1000);
  //       },
  //       error: (err) => {
  //         this.message = '❌ Registration Failed. Please try again.';
  //         this.messageColor = 'red';
  //         console.error('Error:', err);
  //       }
  //     });
  //   } else {
  //     this.regis.markAllAsTouched();
  //     this.message = '⚠️ Please fill all fields correctly.';
  //     this.messageColor = 'orange';
  //   }
  // }

  registerData() {
    if (this.regis.valid) {
      this.service.registerUser(this.regis.value).subscribe({
        next: (res) => {
          Swal.fire({
            icon: 'success',
            title: '✅ Registration Successful!',
            text: 'Redirecting to login...',
            confirmButtonColor: '#28a745',
            confirmButtonText: 'Go Login..',
            // showConfirmButton: false,
            timer: 2000,  // 2-second delay
            timerProgressBar: true
          });

          setTimeout(() => {
            this.regis.reset();
            this.router.navigateByUrl('/login');
          }, 2000); // Wait 2 seconds then navigate
        },
        error: (err) => {
          console.error('Error:', err);
          Swal.fire({
            icon: 'error',
            title: '❌ Registration Failed',
            text: 'Something went wrong. Please try again.',
            confirmButtonColor: '#d33'
          });
        }
      });
    } else {
      this.regis.markAllAsTouched();
      Swal.fire({
        icon: 'warning',
        title: '⚠️ Incomplete Form',
        text: 'Please fill out all fields correctly.',
        confirmButtonColor: '#ffc107'
      });
    }
  }



  // Sir Register
  // registerData() {
  //   this.service.registerUser(this.regis.value).subscribe(res => {
  //     if (res) {
  //       alert("Employee Added!")
  //       this.router.navigateByUrl('login');
  //     } else {
  //       this.router.navigateByUrl('');
  //     }
  //   })
  // }
}
