import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the DetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//@IonicPage()
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {

  constructor(params: NavParams,public navCtrl: NavController, public navParams: NavParams) {
    console.log(params)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailPage');
  }
  close(){
    this.navCtrl.pop();
  }
}
