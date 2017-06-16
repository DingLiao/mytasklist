import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private model: any = {};
  private loading = false;
  private returnUrl: string;
  private error: string;

  constructor(private route: ActivatedRoute, 
  	private router: Router,
  	private authenticationService: AuthenticationService) { }

  ngOnInit() {
  }

  login() {
  	this.loading = true;
  	this.error = "";
  	this.authenticationService.login(this.model.username, this.model.password)
  		.subscribe(
  			data => {
  				this.loading = false;
  				console.log('data: ' + JSON.stringify(data));
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
