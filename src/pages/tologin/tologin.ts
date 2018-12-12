import { Component } from '@angular/core';
import {NavController, NavParams ,ViewController } from 'ionic-angular';
import { LoginPage } from '../login/login';
/**
 * Generated class for the TologinPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//@IonicPage()
@Component({
  selector: 'page-tologin',
  templateUrl: 'tologin.html',
})
export class TologinPage {

  constructor(public viewCtrl: ViewController,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TologinPage');
  }
  goto(){
    this.navCtrl.push(LoginPage);
  }
  go(){
    let data = { 'foo': 'bar' };
    this.viewCtrl.dismiss(data);
   }
}
