import {Credentials} from "./credentials";

export class User {
  _id   : number;
  _name : string;
  private _cred : Credentials;

  constructor(
    id   : number,
    name : string
  ){
    this._name = name;
    this._id = id;
  }


  getId(): number {
    return this._id;
  }

  getName(): string {
    return this._name;
  }


  get cred(): Credentials {
    return this._cred;
  }

  set cred(value: Credentials) {
    this._cred = value;
  }
}
