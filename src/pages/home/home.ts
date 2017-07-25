//@Framework
import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';

//@Providers
import { UserTasksProvider } from "../../providers/user-tasks/user-tasks";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public usrTasks : UserTasksProvider) {

  }

  ngOnInit(){
    let userTasks = this.usrTasks.getTasks(0);

    for(let task of userTasks){
      console.log(task.toString(),' ', task.unixEpoch);
    }
  }

}
