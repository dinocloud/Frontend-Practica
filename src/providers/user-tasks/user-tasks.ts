import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import * as moment from 'moment';
//@Models
import { Task } from "../../models/task";
import { User } from "../../models/user";
import { Status } from "../../models/status";


@Injectable()
export class UserTasksProvider{

  userTasks : Array<Task> = new Array<Task>();

  constructor() {
  }

  public getTasks(user : User) : Array<Task> {
    if(this.userTasks.length == 0) {
      let userId = user.getId();
      let another = new User(0, 'Dino');
      let stati = [new Status(0, 'PENDING'), new Status(1, 'DONE')];
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

    }

    return this.userTasks;

  }

  postTask(task : Task) {
    this.userTasks.push(task);
  }

  putTask(task : Task) {
    console.log('Put ', task.toString(), ' to the server');
  }

  getNextId() : number {
    //For the effects of the mocked up data, delete when the conection w/ Backend is established
    return this.userTasks[this.userTasks.length-1].id;
  }

}
