import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

//@Models
import { Task } from "../../models/task";

/**
 * Generated class for the TaskEditorPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-task-editor',
  templateUrl: 'task-editor.html',
})
export class TaskEditorPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ngOnInit(){

  }

}
