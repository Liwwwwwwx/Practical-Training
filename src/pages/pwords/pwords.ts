import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { PublishPage } from '../publish/publish';
import { SavewenjiPage } from '../savewenji/savewenji';
/**
 * Generated class for the PwordsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//@IonicPage()
@Component({
  selector: 'page-pwords',
  templateUrl: 'pwords.html',
})
export class PwordsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PwordsPage');
  }
  goPublish(){
    this.navCtrl.push(PublishPage);
  }
  go(){
    this.navCtrl.push(SavewenjiPage);
  }

}
