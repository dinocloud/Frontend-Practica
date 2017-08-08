import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
//@Models
import { User } from "../../models/user";

@Injectable()
export class UsersProvider {

  users : Array<User>;

  constructor(public http: Http) {
  }

  retrieveUsers()  : Array<User> {
    this.users = [];

    this.http.get('http://54.233.236.160/api/v1/users/').map((res : Response)=>res.json())
      .subscribe( (res) => {
          for(let u of res.user){
            this.users.push(new User(u.id_user, u.username));
          }
        },
        (err) => {console.log(err)});;

    return this.users;
  }
}
