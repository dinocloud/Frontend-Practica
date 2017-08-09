import { Injectable } from '@angular/core';
import { Storage } from "@ionic/storage";
//@Models
import { Credentials } from "../../models/credentials";


/*
  Generated class for the CredentialStorageProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class CredentialStorageProvider {

  constructor(public storage : Storage) {
  }

  getStoredCredentials() : Promise<any> {
    return this.storage.get('credentials');
  }

  saveCredentials(c : Credentials) {
    this.storage.set('credentials', c).then();
  }

  removeCredentials() : Promise<any> {
    return this.storage.remove('credentials');
  }
}
