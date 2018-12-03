import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the FanPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-fan',
  templateUrl: 'fan.html',
})
export class FanPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
  arr=['新的好友','全部粉丝'];
  isActive=0;
  isClick(i){
    this.isActive=i;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FanPage');
  }

}
