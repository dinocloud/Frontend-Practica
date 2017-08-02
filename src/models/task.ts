//@Utils
import * as moment from 'moment';
import { Moment } from "moment";
//@Models
import { User } from "./user";
import { Status } from "./status";


export class Task{

  _id          : number;
  _name        : string;
  _description : string;
  _createdAt   : Moment;
  _status       : Status;

  _users       : Array<User>;
  _ownerId     : number;


  constructor(id: number, name: string, description: string, createdAt: string, state: Status,
              users: Array<User>, ownerId: number) {
    this._id = id;
    this._name = name;
    this._description = description;
    this._createdAt = moment(createdAt);
    this._status = state;
    this._users = users;
    this._ownerId = ownerId;
  }

 get date(): string{
    return this._createdAt.format('ddd DD MMM YYYY @ HH:mm');
  }

  get unixEpoch(): string{
    return moment(this._createdAt).unix().toString();
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

  get status(): Status {
    return this._status;
  }

  get users(): Array<User> {
    return this._users;
  }

  get ownerId(): number {
    return this._ownerId;
  }

  getOwner(): string {
    let user = this.users.find(x => x.getId() == this._ownerId);
    return user.getName();
  }

  isUserAParticipant(u : User) : boolean{
    return this.users.find(x => x.getId() == u.getId()) != undefined;
  }

  userOwnsIt(user: User): boolean {
    return this._ownerId == user.getId();
  }

  public toString() : string{
    return `Id: ${ this.id } Name: ${ this.name } Created @ ${ this.date }`;
  }
}
