import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PublishPage } from '../publish/publish';
import { SavewenjiPage } from '../savewenji/savewenji';
/**
 * Generated class for the PmusicPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pmusic',
  templateUrl: 'pmusic.html',
})
export class PmusicPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PmusicPage');
  }
  goPublish(){
    this.navCtrl.push(PublishPage);
  }
  go(){
    this.navCtrl.push(SavewenjiPage);
  }
}
