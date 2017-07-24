import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {Md5} from "ts-md5/dist/md5";

//@Models
import {User} from "../../models/user";
import {Credentials} from "../../models/credentials";

/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class AuthServiceProvider {

  constructor() {
  }

  public authUser(c : Credentials){
    let r = null;
    if(c.userName == 'rodrigo94' && c.password == Md5.hashStr('password123').toString()){
      r = new User(1, c.userName);
    }
    return r;
  }

  public logout(){
    return true;
  }


}
