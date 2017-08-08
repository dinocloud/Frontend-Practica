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

  constructor(public http : Http,
              public usrProv : UsersProvider,
              public stateProv : TaskStatusProvider) {
  }

  public getTasks(user : User) : Array<Task> {
    this.userTasks = [];
    let headers = new Headers();
    headers.append('Authorization', user.cred.getCredentialsForRequest());
    this.http.get('http://54.233.236.160/api/v1/tasks/get_tasks_per_user/', {headers : headers})
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
    this.userTasks.push(task);
  }

  putTask(task : Task) {
    console.log('Put ', task.toString(), ' to the server');
  }

  getNextId() : number {
    //For the effects of the mocked up data, delete when the connection w/ Backend is established
    return this.userTasks[this.userTasks.length-1].id;
  }

}
