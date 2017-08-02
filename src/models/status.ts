export class Status {
  private _id : number;
  private _description : string;


  constructor(id: number, description: string) {
    this._id = id;
    this._description = description;
  }


  get description(): string {
    return this._description;
  }


  get id(): number {
    return this._id;
  }
}
