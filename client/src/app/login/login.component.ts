import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../_model/user';
import { AuthenticationService } from '../_services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: any = {};
  loading = false;
  returnUrl: string;
  error: string;
  currentUser: User;

  constructor(private route: ActivatedRoute, 
  	private router: Router,
  	private authenticationService: AuthenticationService) { }

  ngOnInit() {
  	this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  	if(this.currentUser) {
  		this.router.navigate(['/']);
  	}

  }

  login() {
  	this.loading = true;
  	this.error = "";
  	this.authenticationService.login(this.model.username, this.model.password)
  		.subscribe(
  			data => {
  				this.loading = false;
  				localStorage.setItem('currentUser', JSON.stringify(data));
  				this.router.navigate(['/']);
  			},
  			error => {
  				this.loading = false;
  				if(error.status === 403) {
  					this.error = 'Wrong username or password.';
  				} else {
  					this.error = error;
  				}
  			}
  		);
  }

}
