import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import * as moment from 'moment';

import {Task} from "../../models/task";


@Injectable()
export class UserTasksProvider {

  constructor() {
  }

  public getTasks(userId : number) : Array<Task> {
    let userTasks : Array<Task> = new Array<Task>();

    userTasks.push(new Task(0, 'Task #1', 'asdfg0',
                  moment().toISOString(), 'DONE', [], userId));
    userTasks.push(new Task(1, 'Task #2', 'asdfg1',
                  moment().subtract(14, 'hour').toISOString(), 'PENDING', [], 9));
    userTasks.push(new Task(2, 'Task #3', 'asdfg2',
                  moment().add(1, 'week').toISOString(), 'WAITING', [], userId));

    return userTasks;

  }

}
