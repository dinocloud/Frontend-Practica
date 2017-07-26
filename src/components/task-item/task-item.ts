import { Component } from '@angular/core';

@Component({
  selector: 'task-item',
  templateUrl: 'task-item.html'
})
export class TaskItemComponent {

  text: string;

  constructor() {
    console.log('Hello TaskItemComponent Component');
    this.text = 'Hello World';
  }

}
