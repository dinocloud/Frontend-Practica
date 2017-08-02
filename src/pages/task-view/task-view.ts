import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

//@Models
import { Task } from "../../models/task"
//@Pages
import { TaskEditorPage } from "../task-editor/task-editor";

@Component({
  selector: 'page-task-view',
  templateUrl: 'task-view.html',
})
export class TaskViewPage implements OnInit{
  task: Task;
  color: String;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ngOnInit(){

    this.task = this.navParams.get('task');
    this.color = this.navParams.get('color');

  }


  editTask() {
    this.navCtrl.push(TaskEditorPage, {'task': this.task});
  }
}
