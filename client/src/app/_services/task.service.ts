import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/map';

import { environment } from '../../environments/environment';

@Injectable()
export class TaskService {

  constructor(private http: Http) { 
  	console.log('Task service initialized...');
  }

  getTasks(userId){
  	return this.http.get(environment.apiUrl + '/tasks', this.jwt())
  		.map(res => res.json());
  }

  addTask(newTask) {
  	var headers = new Headers();
  	headers.append('Content-Type', 'application/json');
  	return this.http.post(environment.apiUrl + '/tasks', JSON.stringify(newTask), this.jwt())
  		.map(res => res.json());
  }

  deleteTask(id) {
  	return this.http.delete(environment.apiUrl + '/tasks/'+id, this.jwt())
  		.map(res => {
        console.log('deleteTask server res: ' + res);
        if(res.status == 200) 
          return "ok";
      });
  }

  updateStatus(task) {
  	var headers = new Headers();
  	headers.append('Content-Type', 'application/json');
  	return this.http.put(environment.apiUrl + '/tasks/'+task._id, JSON.stringify(task), this.jwt())
  	  .map(res => res.json());
  }

  private jwt() {
      // create authorization header with jwt token
      let currentUser = JSON.parse(localStorage.getItem('currentUser'));
      if (currentUser && currentUser.token) {
          let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
          headers.append('Content-Type', 'application/json');
          return new RequestOptions({ headers: headers });
      }
  }
}
