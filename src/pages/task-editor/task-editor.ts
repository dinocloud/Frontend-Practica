import { Component, OnInit } from '@angular/core';
import {NavController, NavParams, ToastController} from 'ionic-angular';
//@Utils
import * as moment from 'moment';
//@Models
import { Task } from "../../models/task";
import { Status } from "../../models/status";
import { User } from "../../models/user";
//@Providers
import { UserTasksProvider } from "../../providers/user-tasks/user-tasks";
import { TaskStatusProvider } from "../../providers/task-status/task-status";
import { UsersProvider } from "../../providers/users/users";


@Component({
  selector: 'page-task-editor',
  templateUrl: 'task-editor.html',
})
export class TaskEditorPage implements OnInit{

  task : Task;
  newTask : Task;
  currentUser : User;
  pageTitle : string;
  sendButtonText : string;
  stati : Array<Status>;
  users : Array<User>;
  myDate: string;
  myHour: string;
  tomorrow: string;
  hasDueDate : boolean;

  constructor(public navCtrl      : NavController,
              public navParams    : NavParams,
              public userTaskProv : UserTasksProvider,
              public statProv     : TaskStatusProvider,
              public usersProv    : UsersProvider,
              public toastCtrl    : ToastController) {
  }

  ngOnInit(){
    this.tomorrow = moment().add(1, 'day').toISOString();
    this.stati = this.statProv.retrieveTaskStati();
    this.users = this.usersProv.users;
    this.task = this.navParams.get('task');
    // A task param indicates that the page should modify the user's task
    // If no task is passed, it should create a new one, and the logged-in user should be it's owner
    if(this.task) {
      this.newTask = new Task(this.task.id,
                              this.task.name,
                              this.task.description,
                              this.task.createdAt.toISOString(),
                              this.task.status,
                              this.task.users,
                              this.task.ownerId);
      this.pageTitle = 'Edit task';
      this.sendButtonText = 'Save changes';
      if(this.task.dueDate){
        this.myDate = this.task.dueDay;
        this.myHour = this.task.dueHour;
        this.hasDueDate = true;
      }
    }
    else {
      this.currentUser = this.navParams.get('owner');
      this.newTask = new Task();
      this.newTask.status = this.stati[0];
      this.currentUser ? this.newTask.setOwner(this.currentUser) :
                          console.error('A user should be passed for the new task');
      this.pageTitle = 'New task';
      this.sendButtonText = 'Create the task!';
    }

  }

  sendTask() {
    if(this.task){
      this.task.name = this.newTask.name;
      this.task.description = this.newTask.description;
      this.task.users = this.newTask.users;
      this.task.status = this.newTask.status;
      if(this.hasDueDate){
        let date = this.myDate+' '+this.myHour;
        this.task.dueDate = date;
      }
      else {
        this.task.dueDate = '';
      }

      this.userTaskProv.putTask(this.task).subscribe((res) => {
          this.presentToast('Task edited')
        },
        err => {
          this.presentToast('Error in the connection to the server, please try later.')
        }
      );
    }
    else {
      this.newTask.setCreatedAt();
      if(this.hasDueDate){
        let date = this.myDate+' '+this.myHour;
        this.newTask.dueDate = date;
      }
      this.userTaskProv.postTask(this.newTask).subscribe((res) => {
        this.presentToast('Task successfully created!');
      },
        err => {
          this.presentToast('Error in the connection to the server, please try later.')
        }
      );

    }
    this.navCtrl.pop();
  }

  onSelectChange(selectedValue : any) {
    this.newTask.users = selectedValue;
  }

  presentToast(msg : String) {
    let toast = this.toastCtrl.create({
      message: msg.toString(),
      duration: 1500,
      position: 'bottom'
    });

    toast.present();
  }

}
