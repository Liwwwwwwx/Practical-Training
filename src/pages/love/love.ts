import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import { DetailPage } from '../detail/detail';

/**
 * Generated class for the LovePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//@IonicPage()
@Component({
  selector: 'page-love',
  templateUrl: 'love.html',
})
export class LovePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LovePage');
  }
  goAbout(){
    this.navCtrl.popToRoot();
  }
  goTog(i) {
    this.navCtrl.push(DetailPage);
   }
}
