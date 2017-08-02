import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

//@Models
import { Task } from "../../models/task";
import { Status } from "../../models/status";
import { User } from "../../models/user";
//@Providers
import { UserTasksProvider } from "../../providers/user-tasks/user-tasks";


@Component({
  selector: 'page-task-editor',
  templateUrl: 'task-editor.html',
})
export class TaskEditorPage implements OnInit{

  task : Task;
  pageTitle : string;
  sendButtonText : string;
  stati : Array<Status>;
  users : Array<User>;

  taskName  : string;
  taskDescr : string;


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public userTaskProv : UserTasksProvider) {
  }

  ngOnInit(){
    this.task = this.navParams.get('task');
    if(this.task) {
      this.pageTitle = 'Edit task';
      this.sendButtonText = 'Save changes';
    }
    else {

      this.pageTitle = 'New task';
      this.sendButtonText = 'Create the task!'
    }
    this.stati = [new Status(0, 'PENDING'), new Status(1, 'DONE')];
    this.users = [ new User(0, 'Dino'), new User(1, 'rodrigo94'), new User(2, 'lucre'), new User(3, 'juan')];

  }

  sendTask() {
/*    if(this.task) {

    }
    else {
      let task = new Task(this.userTaskProv.getNextId())
    }*/
  }
}
