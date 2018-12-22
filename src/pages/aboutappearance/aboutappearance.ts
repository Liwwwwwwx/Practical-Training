import { Component } from '@angular/core';
import {NavController, NavParams } from 'ionic-angular';
import { DetailPage } from '../detail/detail';

/**
 * Generated class for the AboutappearancePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//@IonicPage()
@Component({
  selector: 'page-aboutappearance',
  templateUrl: 'aboutappearance.html',
})
export class AboutappearancePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutappearancePage');
  }
  goTog(){
    this.navCtrl.push(DetailPage);
  }
}
