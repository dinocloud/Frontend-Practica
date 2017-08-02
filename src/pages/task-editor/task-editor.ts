import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

//@Models
import {Task} from "../../models/task";


@Component({
  selector: 'page-task-editor',
  templateUrl: 'task-editor.html',
})
export class TaskEditorPage implements OnInit{

  task : Task;
  pageTitle : string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ngOnInit(){
    this.task = this.navParams.get('task');
    this.task ? this.pageTitle = 'Edit task' : this.pageTitle = 'Create new task';
  }

}
