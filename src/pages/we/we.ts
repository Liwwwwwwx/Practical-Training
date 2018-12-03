import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FunPage } from '../fun/fun';
import { HelpPage } from '../help/help';
/**
 * Generated class for the WePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-we',
  templateUrl: 'we.html',
})
export class WePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WePage');
  }
  go(){
    this.navCtrl.push(FunPage);
  }
  goTo(){
    this.navCtrl.push(HelpPage);
  }
}
