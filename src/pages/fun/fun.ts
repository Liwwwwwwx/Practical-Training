import { Component } from '@angular/core';
import {NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the FunPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-fun',
  templateUrl: 'fun.html',
})
export class FunPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FunPage');
  }

}
