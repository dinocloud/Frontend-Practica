import { Component, OnInit } from '@angular/core';
import {AlertController, NavController, NavParams, ToastController} from 'ionic-angular';

//@Models
import { Task } from "../../models/task"
//@Pages
import { TaskEditorPage } from "../task-editor/task-editor";
//@Providers
import { UserTasksProvider } from "../../providers/user-tasks/user-tasks";

@Component({
  selector: 'page-task-view',
  templateUrl: 'task-view.html',
})
export class TaskViewPage implements OnInit{
  task: Task;
  color: String;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public usrTaskProv : UserTasksProvider,
              public toastCtrl : ToastController,
              public alertCtrl : AlertController) {
  }

  ngOnInit(){

    this.task = this.navParams.get('task');
    this.color = this.navParams.get('color');

  }


  editTask() {
    this.navCtrl.push(TaskEditorPage, {'task': this.task});
  }

  deleteTask() {
    let alert = this.alertCtrl.create({
      title: 'Atention!',
      message: 'Do you really want to deleteTask this task?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Delete',
          handler: () => {
            this.usrTaskProv.deleteTask(this.task).subscribe(res => {
              let toast = this.toastCtrl.create({
                message: `${this.task.name} deleted!`,
                duration: 1500,
                position: 'bottom'
              });

              toast.onDidDismiss(() => {
                console.log('Dismissed toast');
              });

              toast.present();

            },
              err => console.log(err));

            this.navCtrl.pop();
          }
        }
      ]
    });
    alert.present();

  }
}
