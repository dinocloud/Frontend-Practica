import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from "rxjs/Observable";
//@Models
import { Status } from "../../models/status";

@Injectable()
export class TaskStatusProvider {
  taskStati : Array<Status>;

  constructor(public http: Http) {

  }

  getStatus() : Observable<any> {
    return this.http
                .get('http://54.233.236.160/api/v1/tasks/get_statuses/')
                .map((res : Response)=>res.json());
  }

  retrieveTaskStati() {
    if(!this.taskStati){
      this.taskStati = [];
    }
    if(this.taskStati.length == 0){
      this.getStatus().subscribe( (res) => {
        for(let s of res.statuses){
          this.taskStati.push(new Status(s.id_task_status, s.description));
        }
      },
        (err) => {console.log(err)});
    }
    return this.taskStati;
  }

}
