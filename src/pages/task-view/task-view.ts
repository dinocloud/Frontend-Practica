import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

//@Models
import { Task } from "../../models/task"

@Component({
  selector: 'page-task-view',
  templateUrl: 'task-view.html',
})
export class TaskViewPage {
  task: Task;
  color: String;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ngOnInit(){

    this.task = this.navParams.get('task');
    this.color = this.navParams.get('color');

  }


}
