import { Injectable } from '@angular/core';
import { Http, Response, Headers } from "@angular/http";
import 'rxjs/add/operator/map';
import { Observable } from "rxjs/Observable";

//@Models
import { Task } from "../../models/task";
import { User } from "../../models/user";
//@Providers
import { UsersProvider } from "../users/users";
import { TaskStatusProvider } from "../task-status/task-status";


@Injectable()
export class UserTasksProvider{

  userTasks : Array<Task>;
  baseURL = 'http://54.233.236.160/api/v1/';
  private _authHeader : Headers;


  constructor(public http : Http,
              public usrProv : UsersProvider,
              public stateProv : TaskStatusProvider) {
  }


  setAuthForUser(user : User) {
    this._authHeader = new Headers();
    this._authHeader.append('Authorization', user.cred.getCredentialsForRequest());
  }

  getTasksObservable() : Observable<any> {
    return this.http.get(
      this.baseURL+'tasks/get_tasks_per_user/',
      {headers : this._authHeader})
      .map((res : Response)=>res.json());
  }

  postTask(task : Task) {
    // this.userTasks.push(task);
    let usersId = [];
    for(let u of task.users){
      if(!task.userOwnsIt(u)) {
        usersId.push(u.getId());
      }

    }
    let dueDate : string;
    task.dueDate ? dueDate = task.unixDueDate : dueDate = null;
    return this.http.post(this.baseURL+'tasks/',
      {
        "task_name": task.name,
        "task_description": task.description,
        "users" : usersId,
        "due_date" : dueDate
      },
      { headers: this._authHeader})
      .map((res : Response)=>res.json());

  }

  putTask(task : Task) {
    let usersId = [];
    for(let u of task.users){
      if(!task.userOwnsIt(u)) {
        usersId.push(u.getId());
      }

    }
    let dueDate : string;
    task.dueDate ? dueDate = task.unixDueDate : dueDate = null;
    return this.http.put(this.baseURL+'tasks/'+task.id,
      {
        "task_name": task.name,
        "task_description": task.description,
        "users" : usersId,
        "id_task_status" : task.status.id,
        "due_date" : dueDate
      },
      { headers: this._authHeader})
      .map((res : Response)=>res.json());
  }

  deleteTask(task : Task) {
    return this.http
      .delete(this.baseURL+'tasks/'+task.id, { headers : this._authHeader})
      .map((res : Response)=>res.json());
  }


}
