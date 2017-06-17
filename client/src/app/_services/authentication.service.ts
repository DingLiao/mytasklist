import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject }    from 'rxjs/Subject';
import 'rxjs/add/operator/map';

import { environment } from '../../environments/environment';
import { User } from '../_model/user';

@Injectable()
export class AuthenticationService {
 	currentUser = new Subject<User>();

 	currentUserObservable = this.currentUser.asObservable();

  constructor(private http: Http) { }

  login(username: string, password: string) {
  	console.log('username: ' + username + ', password: ' + password);
  	return this.http.post(environment.apiUrl + '/users/authenticate', { username: username, password: password })
  		.map((response: Response) => {
  			let user = response.json();
  			this.currentUser.next(user);
  			return user;
  		});
  }

  logout() {

  }

}
