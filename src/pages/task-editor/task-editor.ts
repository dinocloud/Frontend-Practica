import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

//@Models
import { Task } from "../../models/task";
import { Status } from "../../models/status";
import { User } from "../../models/user";


@Component({
  selector: 'page-task-editor',
  templateUrl: 'task-editor.html',
})
export class TaskEditorPage implements OnInit{

  task : Task;
  pageTitle : string;
  stati : Array<Status>;
  users : Array<User>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ngOnInit(){
    this.task = this.navParams.get('task');
    this.task ? this.pageTitle = 'Edit task' : this.pageTitle = 'Create new task';
    this.stati = [new Status(0, 'PENDING'), new Status(1, 'DONE')];
    this.users = [ new User(0, 'Dino'), new User(1, 'rodrigo94'), new User(2, 'lucre'), new User(3, 'juan')];

  }

}
