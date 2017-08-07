//@Framework
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/timeout';
import 'rxjs/add/operator/delay';
import { Http, Headers, Response } from "@angular/http";
import { Observable } from "rxjs/Observable";

//@Models
import { Credentials } from "../../models/credentials";

@Injectable()
export class AuthServiceProvider {

  private url : string = 'http://54.233.236.160/api/v1/users/login/';

  constructor(private http: Http) {
  }

  authUser(c : Credentials) : Observable<any>{
    let headers = new Headers();
    headers.append('Authorization', 'Basic '+c.getCredentialsForRequest());


    return this.http.get(this.url, { headers: headers})
      .retry(2)
      .delay(10)
      .timeout(10000)
      .map((res: Response)=>res.json());
  }

  logout(){
    return true;
  }


}
