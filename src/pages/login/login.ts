//@Framework
import { Component } from '@angular/core';
import { AlertController, LoadingController, NavController, NavParams } from 'ionic-angular';
//@Pages
import { HomePage } from "../home/home";
//@Models
import {Credentials} from "../../models/credentials";
import { User } from "../../models/user";
//@Providers
import { AuthServiceProvider } from "../../providers/auth-service/auth-service";

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  loginData : Credentials;
  usrName   : string;
  usrPsw    : string;
  user      : User;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public authService : AuthServiceProvider,
              public loadingCtrl : LoadingController,
              public alertCtrl   : AlertController) {
  }

  login() {
    this.loginData = new Credentials(this.usrName, this.usrPsw);
    this.user = this.authService.authUser(this.loginData);
    this.waitForResponse().then(() => {
      setTimeout(() => {

        if(this.user){
          this.navCtrl.setRoot(HomePage, this.user);
        }
        else{
          this.incorrectData();
        }
      }, 3000);
    });
  }

  waitForResponse(){
    let loading = this.loadingCtrl.create({
      content: 'Logging in, please wait...',
      spinner: 'circles',
      duration: 3000
    });

    return loading.present();
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
}
