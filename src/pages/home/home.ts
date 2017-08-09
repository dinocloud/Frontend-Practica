//@Framework
import { Component, OnInit } from '@angular/core';
import {NavController, NavParams, ToastController} from 'ionic-angular';

//@Providers
import { UserTasksProvider } from "../../providers/user-tasks/user-tasks";
import { CredentialStorageProvider } from "../../providers/credential-storage/credential-storage";
import { TaskStatusProvider } from "../../providers/task-status/task-status";
import { UsersProvider } from "../../providers/users/users";
//@Models
import { Task } from "../../models/task";
import { User } from "../../models/user";
//@Pages
import { TaskEditorPage } from "../task-editor/task-editor";
import { TaskViewPage } from "../task-view/task-view";
import { LoginPage } from "../login/login";
import { Status } from "../../models/status";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit{

  //Different colors for each card
  colors : Array<string> = ['blue', 'red', 'green'];

  userTasks : Array<Task>;

  owner :  User;

  users : Array<User>;

  stati : Array<Status>;


  constructor(public navCtrl        : NavController,
              public navParams      : NavParams,
              public usrTasks       : UserTasksProvider,
              public toastCtrl      : ToastController,
              public credentialStore : CredentialStorageProvider,
              public statProv  : TaskStatusProvider,
              public usersProv : UsersProvider) {

  }

  ngOnInit() {
    this.owner = this.navParams.get('owner');
    this.users = this.usersProv.retrieveUsers();
    this.stati = this.statProv.retrieveTaskStati();
    this.userTasks = this.usrTasks.getTasks(this.owner);
  }

  openTask(task: Task, colorIndex: number) {
    this.navCtrl.push(TaskViewPage, {'task': task, 'color': this.getCardColor(colorIndex), 'stati': this.stati});
  }

  getCardColor(i: number): string {
    let currentIndex = Math.floor(i % this.colors.length);
    let currentColor = this.colors[currentIndex];
    return currentColor;
  }

  addNewTask() {
    this.navCtrl.push(TaskEditorPage, {'owner': this.owner, 'stati': this.stati});
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

  logoutButtonClick() {
    this.credentialStore.removeCredentials().then( () => {
      let toast = this.toastCtrl.create({
        message: `Goodbye!`,
        duration: 1500,
        position: 'bottom'
      });


      toast.present();

      this.navCtrl.setRoot(LoginPage);
    });

  }
}
