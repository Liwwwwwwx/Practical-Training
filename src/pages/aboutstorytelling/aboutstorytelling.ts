import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import { DetailPage } from '../detail/detail';

/**
 * Generated class for the AboutstorytellingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//@IonicPage()
@Component({
  selector: 'page-aboutstorytelling',
  templateUrl: 'aboutstorytelling.html',
})
export class AboutstorytellingPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutstorytellingPage');
  }
  goTog(){
    this.navCtrl.push(DetailPage);
  }
}
