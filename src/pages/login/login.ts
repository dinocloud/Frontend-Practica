import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

//@Pages
import {HomePage} from "../home/home";


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login() {
    this.navCtrl.setRoot(HomePage);
  }
}
