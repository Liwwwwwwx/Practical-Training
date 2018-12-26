import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { OthersdataPage } from '../othersdata/othersdata';

/**
 * Generated class for the OtheruserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-otheruser',
  templateUrl: 'otheruser.html',
})
export class OtheruserPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OtheruserPage');
  }
  goLast(){
    this.navCtrl.pop();
  }
  godata(){
    this.navCtrl.push(OthersdataPage);
  }
}
