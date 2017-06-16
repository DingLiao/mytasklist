import { Component, OnInit } from '@angular/core';
import { User } from '../_model/user';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';

@Component({
  selector: 'app-navigator',
  templateUrl: './navigator.component.html',
  styleUrls: ['./navigator.component.css']
})
export class NavigatorComponent implements OnInit {
	currentUser: User;

  constructor(private route: ActivatedRoute, 
  	private router: Router,
  	private authenticationService: AuthenticationService) { }

  ngOnInit() {
  	this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  signOut() {
  	console.log('sign out');
  	// remove user from local storage to log user out
  	localStorage.removeItem('currentUser');
  	this.currentUser=null;
  	this.router.navigate(['/login']);
  }

}
