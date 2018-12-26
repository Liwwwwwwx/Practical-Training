import { Component } from '@angular/core';
import { NavController, NavParams ,ViewController} from 'ionic-angular';

/**
 * Generated class for the RespondPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-respond',
  templateUrl: 'respond.html',
})
export class RespondPage {

  constructor(public viewCtrl: ViewController,public navCtrl: NavController, public navParams: NavParams) {
  }
  go(){
    let data = { 'foo': 'bar' };
    this.viewCtrl.dismiss(data);
   }
  ionViewDidLoad() {
    console.log('ionViewDidLoad RespondPage');
  }

}
