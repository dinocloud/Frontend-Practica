//@Framework
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Http, Headers, Response } from "@angular/http";
import { Observable } from "rxjs/Observable";

//@Models
import { Credentials } from "../../models/credentials";

@Injectable()
export class AuthServiceProvider {

  private url : string = 'http://54.233.236.160/users/login/';

  constructor(private http: Http) {
  }

  authUser(c : Credentials): Observable<any>{
    let headers = new Headers();
    headers.append('Authorization', 'Basic '+c.getCredentialsForRequest());


    return this.http.get(this.url, { headers: headers})
                    .map((res: Response)=>res.json());
  }

  logout(){
    return true;
  }


}
