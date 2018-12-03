import { Component } from '@angular/core';
import {NavController, NavParams } from 'ionic-angular';
import { ProblemPage } from '../problem/problem';
/**
 * Generated class for the AdvicePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-advice',
  templateUrl: 'advice.html',
})
export class AdvicePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdvicePage');
  }
  go(){
    this.navCtrl.push(ProblemPage);
  }
}
