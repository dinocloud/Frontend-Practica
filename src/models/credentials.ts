import { Md5 } from 'ts-md5/dist/md5';
export class Credentials {
  public userName : string;
  public password : string;


  constructor(userName : string, password : string) {
    this.userName = userName;
    this.password = Md5.hashStr(password).toString();
    console.log(this.userName, ' ', this.password);
  }


}
