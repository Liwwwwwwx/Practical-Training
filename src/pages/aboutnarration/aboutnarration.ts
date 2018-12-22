import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import { DetailPage } from '../detail/detail';

/**
 * Generated class for the AboutnarrationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//@IonicPage()
@Component({
  selector: 'page-aboutnarration',
  templateUrl: 'aboutnarration.html',
})
export class AboutnarrationPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutnarrationPage');
  }
  goTog(){
    this.navCtrl.push(DetailPage);
  }
}
