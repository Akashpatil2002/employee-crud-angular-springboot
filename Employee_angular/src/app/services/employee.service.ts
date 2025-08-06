import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

  // Login
  sendData(loginUser: any): Observable<any> {
    return this.http.post("http://localhost:8080/login", loginUser);
  }

  // Register
  private baseUrl = 'http://localhost:8080';
  registerUser(employee: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, employee);
  }

  // Get All Employees
  getAllEmployee(): Observable<any> {
    return this.http.get('http://localhost:8080/getAll');
  }


  // Update Employee
  // private baseeUrl = 'http://localhost:8080/update'; // Update your endpoint
  // getAll() {
  //   return this.http.get(this.baseeUrl);
  // }
  // updateEmployee(id: number, data: any) {
  //   return this.http.put(`${this.baseeUrl}/${id}`, data);
  // }


  private updateUrl = 'http://localhost:8080/update';
  updateEmployee(id: number, data: any) {
    return this.http.put(`${this.updateUrl}/${id}`, data);
  }


  // Delete
  private deleteUrl = 'http://localhost:8080/delete';

  deleteEmployee(id: number) {
    return this.http.delete(`${this.deleteUrl}/${id}`);
  }
}
