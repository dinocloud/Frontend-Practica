export class User {
  _id   : number;
  _name : string;

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
}
