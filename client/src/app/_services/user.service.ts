import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/map';

import { environment } from '../../environments/environment';
import { User } from '../_model/user';

@Injectable()
export class UserService {

  constructor(private http: Http) { }

  create(user: User) {
  	var headers = new Headers();
  	headers.append('Content-Type', 'application/json');
  	return this.http.post(environment.apiUrl + '/users/register', user, {headers: headers})
  		.map(res => {
   			return res.json()
   		});
  }

}
