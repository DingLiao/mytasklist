import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../_model/user';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
	model: any = {};
	loading = false;
	error: string;
	currentUser: User;

  constructor(private router: Router,
  	private userService: UserService) { }

  ngOnInit() {
  	this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  	if(this.currentUser) {
  		this.router.navigate(['/static/home']);
  	}
  }

  register() {
  	this.loading = true;
  	this.userService.create(this.model)
  		.subscribe(
  			data => {
  				console.log('component: ' + data);
  				this.router.navigate(['/static/login']);
  			},
  			error => {
  				this.loading = false;
  				if(error.status === 403) {
  					this.error = 'Username already exists.';
  				} else {
  					this.error = error;
  				}
  			}
  		);

  }

}
