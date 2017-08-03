//@Framework
import { Component, OnInit } from '@angular/core';
import {NavController, NavParams, ToastController} from 'ionic-angular';

//@Providers
import { UserTasksProvider } from "../../providers/user-tasks/user-tasks";
//@Models
import { Task } from "../../models/task";
import { User } from "../../models/user";
//@Pages
import { TaskEditorPage } from "../task-editor/task-editor";
import { TaskViewPage } from "../task-view/task-view";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit{

  //Different colors for each card
  colors : Array<string> = ['blue', 'red', 'green'];

  userTasks : Array<Task>;

  owner :  User;

  constructor(public navCtrl   : NavController,
              public navParams : NavParams,
              public usrTasks  : UserTasksProvider,
              public toastCtrl : ToastController) {

  }

  ngOnInit() {
    this.owner = this.navParams.get('user');
    this.userTasks = this.usrTasks.getTasks(this.owner);
  }

  openTask(task: Task, colorIndex: number) {
    this.navCtrl.push(TaskViewPage, {'task': task, 'color': this.getCardColor(colorIndex)});
  }

  getCardColor(i: number): string {
    let currentIndex = Math.floor(i % this.colors.length);
    let currentColor = this.colors[currentIndex];
    return currentColor;
  }

  addNewTask() {
    this.navCtrl.push(TaskEditorPage, {'owner': this.owner});
  }

  doRefresh(refresher) {

    setTimeout(() => {
      refresher.complete();
      let toast = this.toastCtrl.create({
        message  : 'Your tasks are up to date',
        duration : 2000
      });
      toast.present();
    }, 2000);
  }
}
