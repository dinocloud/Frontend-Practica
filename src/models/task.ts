//@Utils
import * as moment from 'moment';
import { Moment } from "moment";
//@Models
import { User } from "./user";
import { Status } from "./status";


export class Task{

  private _id           : number;
  private _name         : string;
  private _description  : string;
  private _createdAt    : Moment;
  private _dueDate      : Moment;
  private _status       : Status;

  private _users        : Array<User>;
  private _ownerId      : number;

  constructor(id?: number, name?: string, description?: string, createdAt?: string, state?: Status,
              users?: Array<User>, ownerId?: number) {
    this._id = id;
    this._name = name;
    this._description = description;
    this._createdAt = moment(createdAt);
    this._status = state;
    this._users = users;
    this._ownerId = ownerId;
  }

 get creationDate(): string{
    return this._createdAt.format('ddd DD MMM YYYY @ HH:mm');
  }


  get createdAt(): moment.Moment {
    return this._createdAt;
  }

  get unixDueDate(): string{
    return this._dueDate.unix().toString();
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
    return `Id: ${ this.id } Name: ${ this.name } Created @ ${ this.creationDate }`;
  }


  set id(value: number) {
    this._id = value;
  }

  set name(value: string) {
    this._name = value;
  }

  set description(value: string) {
    this._description = value;
  }

  setCreatedAt() {
    this._createdAt = moment();
  }

  set status(value: Status) {
    this._status = value;
  }

  set users(value: Array<User>) {
    this._users = value;
  }

  set ownerId(value: number) {
    this._ownerId = value;
  }

  setOwner(owner : User){

    this.users ? this.users.push(owner) : this.users = [owner];
    this.ownerId = owner.getId();
  }


  get dueDate(): string {
    if(this._dueDate){
      return this._dueDate.format('ddd DD MMM YYYY @ HH:mm');
    }
    return ''
  }

  set dueDate(value: string) {
    if(value) {
      this._dueDate = moment(value);
    }
    else {
      this._dueDate = undefined;
    }
  }

  get dueDay() : string {
    if(this._dueDate){
      return this._dueDate.format('YYYY-MM-DD');
    }
    return '';
  }

  get dueHour() : string {
    if(this._dueDate){
      return this._dueDate.format('HH:mm');
    }
    return '';
  }

  taskIsDueIn(days : number){
    if(this._dueDate) {
      return moment().add(days, 'days').isSameOrAfter(this._dueDate, 'days');
    }
    return false;
  }
}
