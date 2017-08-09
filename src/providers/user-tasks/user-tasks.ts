import { Injectable } from '@angular/core';
import { Http, Response, Headers } from "@angular/http";
import 'rxjs/add/operator/map';

//@Models
import { Task } from "../../models/task";
import { User } from "../../models/user";
import { Status } from "../../models/status";
//@Providers
import { UsersProvider } from "../users/users";
import {TaskStatusProvider} from "../task-status/task-status";


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

  public getTasks() : Array<Task> {
    this.userTasks = [];
    this.http.get(this.baseURL+'tasks/get_tasks_per_user/', {headers : this._authHeader})
      .map((res : Response)=>res.json())
      .subscribe(res => {
        for(let t of res.all_tasks){
          let owner = this.usrProv.users.find(x => x.getId() == t.owner.id_user);

          let users = [owner];
          for(let u of t.users) {
            let user = this.usrProv.users.find(x => x.getId() == u.id_user);
            users.push(user);
          }

          let state = this.stateProv.retrieveTaskStati().find(x => x.id == t.task.id_task_status);

          let task = new Task(
            t.task.id_task,
            t.task.task_name,
            t.task.task_description,
            t.task.date_created,
            state,
            users,
            owner.getId()
          );

          this.userTasks.push(task);
        }
      });

    return this.userTasks;

  }

  postTask(task : Task) {
    // this.userTasks.push(task);
    let usersId = [];
    for(let u of task.users){
      if(!task.userOwnsIt(u)) {
        usersId.push(u.getId());
      }

    }
    return this.http.post(this.baseURL+'tasks/',
      {
      "task_name": task.name,
      "task_description": task.description,
      "users" : usersId
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
    return this.http.put(this.baseURL+'tasks/'+task.id,
      {
        "task_name": task.name,
        "task_description": task.description,
        "users" : usersId,
        "id_task_status" : task.status.id
      },
      { headers: this._authHeader})
      .map((res : Response)=>res.json());
  }

  deleteTask(task : Task) {
    let i = this.userTasks.findIndex(x => x.id == task.id);
    this.userTasks.splice(i, 1);
  }


}
