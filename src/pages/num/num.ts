import { Component } from '@angular/core';
import {NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the NumPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-num',
  templateUrl: 'num.html',
})
export class NumPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NumPage');
  }

}
