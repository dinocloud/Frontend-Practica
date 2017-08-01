import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

//@Models
import { Task } from "../../models/task"

/**
 * Generated class for the TaskViewPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-task-view',
  templateUrl: 'task-view.html',
})
export class TaskViewPage {
  task: Task;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ngOnInit(){

    this.task = this.navParams.get('task');

  }


}
