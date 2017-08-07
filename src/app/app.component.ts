import {Component, ViewChild} from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
//@Pages
import { LoginPage } from "../pages/login/login";
import {HomePage} from "../pages/home/home";
//@Providers
import {CredentialStorageProvider} from "../providers/credential-storage/credential-storage";

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
          this.nav.setRoot(HomePage);
        }
      });

    });
  }
}

