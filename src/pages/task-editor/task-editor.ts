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
  newTask : Task;
  currentUser : User;
  pageTitle : string;
  sendButtonText : string;
  stati : Array<Status>;
  users : Array<User>;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public userTaskProv : UserTasksProvider) {
  }

  ngOnInit(){
    this.stati = [new Status(0, 'PENDING'), new Status(1, 'DONE')];
    this.users = [ new User(0, 'Dino'), new User(1, 'rodrigo94'), new User(2, 'lucre'), new User(3, 'juan')];
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
    }
    else {
      this.currentUser = this.navParams.get('owner');
      this.newTask = new Task();
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
      this.userTaskProv.putTask(this.task);
    }
    else {
      this.newTask.id = this.userTaskProv.getNextId();
      this.newTask.setCreatedAt();
      this.userTaskProv.postTask(this.newTask);

    }
    this.navCtrl.goToRoot({});
  }

  onSelectChange(selectedValue : any) {
    this.newTask.users = selectedValue;
  }
}
