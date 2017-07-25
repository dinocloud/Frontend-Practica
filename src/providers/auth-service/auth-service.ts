import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Md5 } from "ts-md5/dist/md5";

//@Models
import { User } from "../../models/user";
import { Credentials } from "../../models/credentials";

@Injectable()
export class AuthServiceProvider {

  constructor() {
  }

  authUser(c : Credentials){
    let r;
    if(c.userName == 'rodrigo94' && c.password == Md5.hashStr('password123').toString()){
      r = new User(1, c.userName);
    }
    return r;
  }

  logout(){
    return true;
  }


}
