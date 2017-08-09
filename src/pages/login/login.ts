//@Framework
import { Component } from '@angular/core';
import {  AlertController,
          LoadingController,
          NavController,
          ToastController} from 'ionic-angular';
//@Pages
import { HomePage } from "../home/home";
//@Models
import {Credentials} from "../../models/credentials";
import { User } from "../../models/user";
//@Providers
import { AuthServiceProvider } from "../../providers/auth-service/auth-service";
import { CredentialStorageProvider } from "../../providers/credential-storage/credential-storage";

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage{

  loginData : Credentials;
  usrName   : string;
  usrPsw    : string;
  user      : User;

  constructor(public navCtrl          : NavController,
              public authService      : AuthServiceProvider,
              public loadingCtrl      : LoadingController,
              public alertCtrl        : AlertController,
              public toastCtrl        : ToastController,
              public credentialStore  : CredentialStorageProvider) {
  }

  login() {
    this.loginData = new Credentials(this.usrName, this.usrPsw);

    let loading = this.loadingCtrl.create({
      content: 'Logging in, please wait...',
      spinner: 'circles'
    });
    loading.present();
    this.authService.authUser(this.loginData).subscribe(
      res => {
        loading.dismiss();
        this.user = new User(res.message.id_user, res.message.username);
        this.credentialStore.saveCredentials(this.loginData);
        this.presentToast();
        this.navCtrl.setRoot(HomePage, {'user': this.user});
      },
      (err: Error) => {
        loading.dismiss();
        this.incorrectData();
      });

  }



  incorrectData(){
    let alert = this.alertCtrl.create({
      title: 'Log in error!',
      message: 'Check your user name and or password and try again...',
      buttons: ['Ok']
    });
    alert.present();
    this.usrPsw = '';
  }

  presentToast() {
    let toast = this.toastCtrl.create({
      message: `Welcome ${this.user.getName()}! Login successfull`,
      duration: 1500,
      position: 'bottom'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }
}
