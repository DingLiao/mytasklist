import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
	private model: any = {};
	private loading = false;

  constructor(private router: Router,
  	private userService: UserService) { }

  ngOnInit() {
  }

  register() {
  	this.loading = true;
  	this.userService.create(this.model)
  		.subscribe(
  			data => {
  				console.log('component: ' + data);
  				this.router.navigate(['/login']);
  			},
  			error => {
  				this.loading = false;
  			}
  		);

  }

}
