import {Component, ViewChild} from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
//@Pages
import { LoginPage } from "../pages/login/login";
import {HomePage} from "../pages/home/home";
//@Providers
import { CredentialStorageProvider } from "../providers/credential-storage/credential-storage";
//@Models
import { User } from "../models/user";
import { Credentials } from "../models/credentials";


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = LoginPage;

  @ViewChild(Nav) nav;

  constructor(platform: Platform, statusBar: StatusBar,
              splashScreen: SplashScreen,
              credentialsStore : CredentialStorageProvider) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      credentialsStore.getStoredCredentials().then((val) => {
        if(val) {
          let user = new User(val._id, val._name);
          //Is already hashed, hence the third parameter
          user.cred = new Credentials(val._cred.userName, val._cred.password, true);
          console.log(user.cred.getCredentialsForRequest());
          this.nav.setRoot(HomePage, { 'owner' : user});
        }
      });

    });
  }
}

