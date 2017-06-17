import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { TaskComponent } from '../task/task.component';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from  '../register/register.component';
import { HomeComponent } from '../home/home.component';

const routes: Routes = [
	{ path: '', redirectTo: '/static/home', pathMatch: 'full'},
	{ path: 'static/home', component: HomeComponent },
	{ path: 'static/tasklist', component: TaskComponent },
	{ path: 'static/login', component: LoginComponent },
	{ path: 'static/register', component: RegisterComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ],
  declarations: []
})
export class AppRoutingModule { }
