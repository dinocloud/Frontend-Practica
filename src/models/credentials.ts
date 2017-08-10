import { Md5 } from 'ts-md5/dist/md5';

export class Credentials {
  private userName : string;
  private password : string;


  constructor(userName : string, password : string, hashed ? : boolean) {
    this.userName = userName;
    if(hashed){
      this.password = password;
    }else{
      this.password = Md5.hashStr(password).toString();
    }
  }

/*  setHashedPassword(hashedPass : string){
    //Workarround because the password is stored hashed when logged in
    this.password = hashedPass;

  }*/

  getCredentialsForRequest() : string {
    let cred = this.userName + ':' + this.password,
        encoded = btoa(cred);
    return 'Basic '+encoded;

  }

}
