import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import { DetailPage } from '../detail/detail';

/**
 * Generated class for the AboutsceneryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//@IonicPage()
@Component({
  selector: 'page-aboutscenery',
  templateUrl: 'aboutscenery.html',
})
export class AboutsceneryPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutsceneryPage');
  }
  goTog(){
    this.navCtrl.push(DetailPage);
  }
}
