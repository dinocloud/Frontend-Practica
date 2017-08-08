import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
//@Models
import { User } from "../../models/user";

@Injectable()
export class UsersProvider {

  private _users : Array<User>;

  constructor(public http: Http) {
  }

  retrieveUsers()  : Array<User> {
    this._users = [];

    this.http.get('http://54.233.236.160/api/v1/users/').map((res : Response)=>res.json())
      .subscribe( (res) => {
          for(let u of res.user){
            this._users.push(new User(u.id_user, u.username));
          }
        },
        (err) => {console.log(err)});;

    return this._users;
  }


  get users(): Array<User> {
    if(this._users){
      return this._users;
    }
    return this.retrieveUsers();
  }
}
