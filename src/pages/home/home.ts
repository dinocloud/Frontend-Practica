//@Framework
import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';

//@Providers
import { UserTasksProvider } from "../../providers/user-tasks/user-tasks";
//@Models
import {Task} from "../../models/task";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  userTasks: Array<Task>;

  constructor(public navCtrl: NavController, public usrTasks : UserTasksProvider) {

  }

  ngOnInit(){
    this.userTasks = this.usrTasks.getTasks(0);
  }

  openTask(task: Task) {
    console.log(task.toString(),' ', task.unixEpoch);
  }
}
