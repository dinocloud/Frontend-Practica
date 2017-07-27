//@Framework
import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';

//@Providers
import { UserTasksProvider } from "../../providers/user-tasks/user-tasks";
//@Models
import {Task} from "../../models/task";
import {User} from "../../models/user";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  userTasks: Array<Task>;

  owner = new User(1, 'rodrigo94');

  constructor(public navCtrl: NavController, public usrTasks : UserTasksProvider) {

  }

  ngOnInit(){
    this.userTasks = this.usrTasks.getTasks(this.owner.getId());
  }

  openTask(task: Task) {
    console.log(task.toString(),' ', task.unixEpoch);
  }
}
