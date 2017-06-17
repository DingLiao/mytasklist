import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params }   from '@angular/router';
import 'rxjs/add/operator/switchMap';

import { TaskService} from '../_services/task.service';
import { Task } from '../_model/task';
import { User } from '../_model/user';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  tasks: Task[];
  title: string;
  currentUser: User;

  constructor(private taskService: TaskService,
    private router: Router,
    private route: ActivatedRoute) { 
  }

  ngOnInit() {
    this.tasks = [];
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.taskService.getTasks(this.currentUser._id)
      .subscribe(tasks => {this.tasks = tasks},
        error => {
          this.router.navigate(['/']);
        });
  }

  addTask(event) {
  	event.preventDefault();
  	console.log(this.title);
  	var newTask = {
  		title: this.title,
  		isDone: false
  	}

  	this.taskService.addTask(newTask).subscribe(task => {
      console.log(task);
  		this.tasks.push(task);
  		this.title= "";
  	});
  }

  deleteTask(id) {
  	var tasks = this.tasks;

  	this.taskService.deleteTask(id).subscribe(data => {
  		console.log('delete task:' + data);
  		for( var i = 0; i < tasks.length; i++) {
        if(tasks[i]._id == id) {
          tasks.splice(i, 1);
        }
      }
  	},
    error => {

    }
    )
  }

  updateStatus(task) {
  	var _task = {
  		_id: task._id,
  		title: task.title,
  		isDone: !task.isDone
  	};
  	this.taskService.updateStatus(_task).subscribe(data => {
  		task.isDone = !task.isDone;
  	})
  }

}
