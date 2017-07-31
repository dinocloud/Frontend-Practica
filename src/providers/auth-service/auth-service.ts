//@Framework
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Http, Response } from "@angular/http";
import { Observable } from "rxjs/Observable";

//@Models
import { Credentials } from "../../models/credentials";

@Injectable()
export class AuthServiceProvider {

  private url : string = 'http://54.233.236.160/users/';

  constructor(private http: Http) {
  }

  authUser(c : Credentials): Observable<any>{
    let authHeader = 'Basic ' + c.getCredentialsForRequest();
    let reqHead = new Headers({'Content-Type': 'application/json', 'Authorization': authHeader,
                              'Access-Control-Allow-Origin': 'http://localhost:8100/'});

    return this.http.get(this.url, reqHead)
                    .map((res: Response)=>res.json());
  }

  logout(){
    return true;
  }


}
