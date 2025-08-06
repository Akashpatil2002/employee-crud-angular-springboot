import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-employee-data',
  templateUrl: './employee-data.component.html',
  styleUrls: ['./employee-data.component.css']
})
export class EmployeeDataComponent implements OnInit {

  updateMessage: string = '';
  messageColor: string = '';

  employees: any;
  // constructor(private service: EmployeeService, private router: Router) { }
  constructor(
    private fb: FormBuilder,
    private service: EmployeeService,
    private router: Router
  ) {
    this.updateForm = this.fb.group({
      id: [''],
      name: [''],
      email: [''],
      password: ['']
    });

  }

  ngOnInit(): void {
    this.getAllEmployee();
  }

  getAllEmployee() {
    this.service.getAllEmployee().subscribe(res => {
      this.employees = res;
    })
  }

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

        // Show logout success alert first
        Swal.fire({
          title: 'Logged Out',
          text: 'You have been successfully logged out.',
          icon: 'success',
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
          didClose: () => {
            // Only redirect *after* this alert disappears
            this.router.navigate(['/login']);
          }
        });
      }
    });
  }



  // Update
  updateForm: FormGroup;
  selectedEmployeeId: number | null = null;

  openUpdateModal(employee: any) {
    this.selectedEmployeeId = employee.id;
    this.updateForm.patchValue({
      id: employee.id,
      name: employee.name,
      email: employee.email,
      password: employee.password
    });

    const bootstrap: any = (window as any).bootstrap;
    const modal = new bootstrap.Modal(document.getElementById('updateModal')!);
    modal.show();
  }

  // submitUpdate() {
  //   if (this.selectedEmployeeId !== null) {
  //     const { id, ...updatedData } = this.updateForm.value; // exclude id

  //     this.service.updateEmployee(this.selectedEmployeeId, updatedData).subscribe({
  //       next: () => {
  //         this.updateMessage = '✅ Employee updated successfully!';
  //         this.messageColor = 'text-success';

  //         setTimeout(() => {
  //           this.updateMessage = '';
  //           window.location.reload(); // Refresh after 2 seconds
  //         }, 1000);
  //       },
  //       error: (err) => {
  //         console.error('Update error:', err);
  //         this.updateMessage = '❌ Failed to update employee.';
  //         this.messageColor = 'text-danger';

  //         setTimeout(() => {
  //           this.updateMessage = '';
  //         }, 1000);
  //       }
  //     });
  //   }
  // }

  submitUpdate() {
    if (this.selectedEmployeeId !== null) {
      const { id, ...updatedData } = this.updateForm.value; // Exclude id

      this.service.updateEmployee(this.selectedEmployeeId, updatedData).subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: 'Updated!',
            text: 'Employee updated successfully.',
            timer: 2000,
            showConfirmButton: false
          });

          setTimeout(() => {
            this.updateForm.reset();
            window.location.reload(); // Refresh after a short delay
          }, 1600);
        },
        error: (err) => {
          console.error('Update error:', err);

          Swal.fire({
            icon: 'error',
            title: 'Update Failed!',
            text: 'Something went wrong while updating the employee.',
            showConfirmButton: true
          });
        }
      });
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'No Employee Selected',
        text: 'Please select an employee to update.',
        showConfirmButton: true
      });
    }
  }




  // Delete 
  deleteMessage: string = '';
  messaageColor: string = '';
  selectedDeleteId: number | null = null;

  openDeleteModal(id: number) {
    this.selectedDeleteId = id;
    const bootstrap: any = (window as any).bootstrap;
    const modal = new bootstrap.Modal(document.getElementById('deleteModal')!);
    modal.show();
  }

  // confirmDelete() {
  //   if (this.selectedDeleteId !== null) {
  //     this.service.deleteEmployee(this.selectedDeleteId).subscribe({
  //       next: () => {
  //         this.deleteMessage = '✅ Employee deleted successfully';
  //         this.messaageColor = 'text-success';
  //         setTimeout(() => {
  //           this.deleteMessage = '';
  //           window.location.reload();
  //         }, 2000);
  //       },
  //       error: (err) => {
  //         console.error('Delete error:', err);
  //         this.deleteMessage = '❌ Failed to delete employee';
  //         this.messaageColor = 'text-danger';
  //       }
  //     });
  //   }
  // }


  confirmDelete(employeeId: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this employee!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#DD6B55',
      cancelButtonColor: '#999',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel plx!',
      reverseButtons: true // optional: swaps button order
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.deleteEmployee(employeeId).subscribe({
          next: () => {
            Swal.fire(
              'Deleted!',
              'Employee has been deleted.',
              'success'
            );
            this.getAllEmployee(); // refresh list
          },
          error: () => {
            Swal.fire(
              'Error!',
              'Failed to delete employee.',
              'error'
            );
          }
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Employee is safe :)',
          'error'
        );
      }
    });
  }



  // Add Employee
  message: string = '';

  regis = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(10)]),
    email: new FormControl('', [
      Validators.required,
      Validators.pattern(/^(?=.*\d)[a-zA-Z0-9._%+-]+@gmail\.com$/)
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
    ])
  });

  // Submit Employee
  registerData() {
    if (this.regis.valid) {
      this.service.registerUser(this.regis.value).subscribe({
        next: (res) => {
          Swal.fire({
            icon: 'success',
            title: '✅ Registration Successful!',
            text: 'Redirecting to employee data...',
            confirmButtonColor: '#28a745',
            confirmButtonText: 'Go to Employee Data',
            timer: 2000,
            timerProgressBar: true
          });

          setTimeout(() => {
            this.regis.reset();

            // ✅ Redirect to /employeeData and refresh
            this.router.navigateByUrl('/employeeData').then(() => {
              window.location.reload(); // Refresh the page after navigation
            });
          }, 2000);
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



  // Back Button Reload
  refreshPage() {
    location.reload();
  }




}
