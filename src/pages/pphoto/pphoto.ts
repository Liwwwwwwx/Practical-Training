import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { PublishPage } from '../publish/publish';
import { SavewenjiPage } from '../savewenji/savewenji';
/**
 * Generated class for the PphotoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//@IonicPage()
@Component({
  selector: 'page-pphoto',
  templateUrl: 'pphoto.html',
})
export class PphotoPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PphotoPage');
  }
  goPublish(){
    this.navCtrl.push(PublishPage);
  }
  go(){
    this.navCtrl.push(SavewenjiPage);
  }

}
