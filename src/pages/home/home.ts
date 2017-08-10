//@Framework
import { Component, OnInit } from '@angular/core';
import {AlertController, LoadingController, NavController, NavParams, ToastController} from 'ionic-angular';
//@Providers
import { UserTasksProvider } from "../../providers/user-tasks/user-tasks";
import { CredentialStorageProvider } from "../../providers/credential-storage/credential-storage";
import { TaskStatusProvider } from "../../providers/task-status/task-status";
import { UsersProvider } from "../../providers/users/users";
//@Models
import { Task } from "../../models/task";
import { User } from "../../models/user";
import { Status } from "../../models/status";
//@Pages
import { TaskEditorPage } from "../task-editor/task-editor";
import { TaskViewPage } from "../task-view/task-view";
import { LoginPage } from "../login/login";

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

  constructor(public navCtrl         : NavController,
              public navParams       : NavParams,
              public usrTasks        : UserTasksProvider,
              public toastCtrl       : ToastController,
              public credentialStore : CredentialStorageProvider,
              public statProv        : TaskStatusProvider,
              public usersProv       : UsersProvider,
              public loadingCtrl     : LoadingController,
              public alertCtrl       : AlertController) {

  }

  ngOnInit() {
    this.owner = this.navParams.get('owner');
    this.users = this.usersProv.retrieveUsers();
    this.stati = this.statProv.retrieveTaskStati();
    this.usrTasks.setAuthForUser(this.owner);
  }

  openTask(task: Task, colorIndex: number) {
    this.navCtrl.push(TaskViewPage,
      {
        'task': task,
        'color': this.getCardColor(task),
        'stati': this.stati,
        'currentUser': this.owner
      });
  }

  getCardColor(task : Task): string {
    let currentColor : string;
    if(task.taskIsDueIn(1)){
      currentColor = 'red';
    }
    else if(task.taskIsDueIn(3)) {
      currentColor = 'yellow';
    }
    else {
      currentColor = 'green';
    }
    return currentColor;
  }

  addNewTask() {
    this.navCtrl.push(TaskEditorPage, {'owner': this.owner, 'stati': this.stati});
  }

  ionViewDidEnter(){
    this.refreshTasksFromServer();
  }

  refreshTasksFromServer(refresher ? : any){
    this.userTasks = [];
    let loading;
    if(!refresher){
      loading = this.loadingCtrl.create({
        content: 'Getting your tasks',
        spinner: 'circles'
      });
      loading.present();
    }
    this.usrTasks.getTasksObservable().subscribe(res => {
      for(let t of res.all_tasks){
        let owner = this.users.find(x => x.getId() == t.owner.id_user);

        let users = [owner];
        for(let u of t.users) {
          let user = this.users.find(x => x.getId() == u.id_user);
          users.push(user);
        }

        let state = this.stati.find(x => x.id == t.task.id_task_status);

        let task = new Task(
          t.task.id_task,
          t.task.task_name,
          t.task.task_description,
          t.task.date_created,
          state,
          users,
          owner.getId()
        );
        if(t.task.due_date){
          task.dueDate = t.task.due_date;
        }

        this.userTasks.push(task);
      }
      if(refresher){
        refresher.complete();
        let toast = this.toastCtrl.create({
          message  : 'Your tasks are up to creationDate',
          duration : 2000
        });
        toast.present();
      }
      else{
        loading.dismiss();
      }
  })
  }


  logoutButtonClick() {

    let alert = this.alertCtrl.create({
      title: 'Atention!',
      message: "Do you want to sign off? You can always sign in again.",
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Yes',
          handler: () => {
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
      ]
    });
    alert.present();

  }
}
