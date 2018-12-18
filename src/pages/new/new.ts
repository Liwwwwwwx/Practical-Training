import { Component } from '@angular/core';
import {  NavController, NavParams,ViewController } from 'ionic-angular';
import {WenjiPage } from '../wenji/wenji';
import { CollectiondetailPage } from '../collectiondetail/collectiondetail';
/**
 * Generated class for the NewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//@IonicPage()
@Component({
  selector: 'page-new',
  templateUrl: 'new.html',
})
export class NewPage {

  constructor(public viewCtrl: ViewController,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewPage');
  }
  go(){
    let data = { 'foo': 'bar' };
    this.viewCtrl.dismiss(data);
  }
  goToa(){
    this.navCtrl.push(CollectiondetailPage);
  }
}
