import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CollectiondetailPage } from '../collectiondetail/collectiondetail';
import { NewPage } from '../new/new';

/**
 * Generated class for the CollectPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//@IonicPage()
@Component({
  selector: 'page-collect',
  templateUrl: 'collect.html',
})
export class CollectPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CollectPage');
  }
  arr=['图文','文章','音乐'];
  isActive=0;
  isClick(i){
    this.isActive=i;
  }
  goToa(){
    this.navCtrl.push(CollectiondetailPage);
  }
  goTonew(){
    this.navCtrl.push(NewPage);
  }
}
