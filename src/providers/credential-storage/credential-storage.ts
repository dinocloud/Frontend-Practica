import { Injectable } from '@angular/core';
import { Storage } from "@ionic/storage";
//@Models
import { User } from "../../models/user";

@Injectable()
export class CredentialStorageProvider {
  
  constructor(public storage : Storage) {
  }

  getStoredCredentials() : Promise<any> {
    return this.storage.get('userCredential');
  }

  saveCredentials(u : User) {
    this.storage.set('userCredential', u).then();
  }

  removeCredentials() : Promise<any> {
    return this.storage.remove('userCredential');
  }
}
