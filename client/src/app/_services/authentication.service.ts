import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { environment } from '../../environments/environment';

@Injectable()
export class AuthenticationService {

  constructor(private http: Http) { }

  login(username: string, password: string) {
  	console.log('username: ' + username + ', password: ' + password);
  	return this.http.post(environment.apiUrl + '/users/authenticate', { username: username, password: password })
  		.map((response: Response) => {
  			let user = response.json();
  			return user;
  		});
  }

  logout() {
  	
  }

}
