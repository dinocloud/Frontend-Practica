//@Utils
import * as moment from 'moment';
import { Moment } from "moment";
//@Models
import { User } from "./user";


export class Task{

  _id          : number;
  _name        : string;
  _description : string;
  _createdAt    : Moment;
  _stateStr    : string;

  _users       : Array<User>;
  _ownerId     : number;


  constructor(id: number, name: string, description: string, createdAt: string, stateStr: string,
              users: Array<User>, ownerId: number) {
    this._id = id;
    this._name = name;
    this._description = description;
    this._createdAt = moment(createdAt); //TODO formato
    this._stateStr = stateStr;
    this._users = users;
    this._ownerId = ownerId;
  }

 get date(): string{
    return this._createdAt.toISOString();
  }


  get id(): number {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get description(): string {
    return this._description;
  }

  get stateStr(): string {
    return this._stateStr;
  }

  get users(): Array<User> {
    return this._users;
  }

  get ownerId(): number {
    return this._ownerId;
  }

  public toString() : string{
    return `Id: ${ this.id } Name: ${ this.name } Created @ ${ this.date }`;
  }
}
