import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

//@Models
import { Task } from "../../models/task";
import { Status } from "../../models/status";


@Component({
  selector: 'page-task-editor',
  templateUrl: 'task-editor.html',
})
export class TaskEditorPage implements OnInit{

  task : Task;
  pageTitle : string;
  stati : Array<Status>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ngOnInit(){
    this.task = this.navParams.get('task');
    this.task ? this.pageTitle = 'Edit task' : this.pageTitle = 'Create new task';
    this.stati = [new Status(0, 'PENDING'), new Status(1, 'DONE')];
  }

}
