import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AdmindashComponent } from './components/admindash/admindash.component';
import { AuthGuard } from './auth.guard';
import { UserdashComponent } from './components/userdash/userdash.component';
import { UserGuard } from './guards/user.guard';
import { EmployeeDataComponent } from './components/employee-data/employee-data.component';

// const routes: Routes = [
//   {
//     path: '',
//     component: HomeComponent
//   }
// ];

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  // { path: 'admindash', component: AdmindashComponent, canActivate: [AuthGuard] },
  { path: 'admindash', component: AdmindashComponent },
  { path: 'userdashboard', component: UserdashComponent, canActivate: [AuthGuard] },
  // { path: 'userdash', component: UserdashComponent, canActivate: [UserGuard] },
  { path: 'userdash', component: UserdashComponent },
  { path: 'employeeData', component: EmployeeDataComponent },

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
