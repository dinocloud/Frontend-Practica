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

  userTasks : Array<Task> = new Array<Task>();

  constructor(public http : Http,
              public usrProv : UsersProvider,
              public stateProv : TaskStatusProvider) {
  }

  public getTasks(user : User) : Array<Task> {
    /*if(this.userTasks.length == 0) {
      let userId = user.getId();
      let another = new User(0, 'Dino');
      let stati = [new Status(1, 'Pending'), new Status(2, 'Done')];
      this.userTasks.push(new Task(0, 'Task #1', 'asdfg0',
        moment().toISOString(), stati[0], [user, another], userId));
      this.userTasks.push(new Task(1, 'Task #2', 'asdfg1',
        moment().subtract(14, 'hour').toISOString(), stati[1], [user, another], 9));
      this.userTasks.push(new Task(2, 'Task #3', 'asdfg2',
        moment().add(1, 'week').toISOString(), stati[1], [user, another], userId));
      this.userTasks.push(new Task(3, 'Task #4', 'asdfg0',
        moment().toISOString(), stati[0], [user, another], userId));
      this.userTasks.push(new Task(4, 'Task #5', 'asdfg1',
        moment().subtract(20, 'hour').toISOString(), stati[1], [user, another], 9));
      this.userTasks.push(new Task(5, 'Task #6', 'asdfg2',
        moment().add(2, 'month').toISOString(), stati[0], [user, another], userId));

    }*/
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

  delete(task : Task) {
    let i = this.userTasks.findIndex(x => x.id == task.id);
    this.userTasks.splice(i, 1);
  }

  getNextId() : number {
    //For the effects of the mocked up data, delete when the conection w/ Backend is established
    return this.userTasks[this.userTasks.length-1].id;
  }

}
