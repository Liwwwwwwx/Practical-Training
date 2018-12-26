import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
//import {CollectiondetailPage } from '../collection/collection';
/**
 * Generated class for the CollectiondetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//@IonicPage()
@Component({
  selector: 'page-collectiondetail',
  templateUrl: 'collectiondetail.html',
})
export class CollectiondetailPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    setTimeout(() => {
       this.navCtrl.popToRoot();
    }, 500);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CollectiondetailPage');
  }

// goToi(){
//   this.navCtrl.popToRoot();
// }
}
