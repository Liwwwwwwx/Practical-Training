import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ChangepasswordmobilePage } from '../changepasswordmobile/changepasswordmobile';
import { ChangepasswordemailPage } from '../changepasswordemail/changepasswordemail';

/**
 * Generated class for the ChangepasswordselectPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//@IonicPage()
@Component({
  selector: 'page-changepasswordselect',
  templateUrl: 'changepasswordselect.html',
})
export class ChangepasswordselectPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChangepasswordselectPage');
  }
  toMobile() {
    this.navCtrl.push(ChangepasswordmobilePage);
  }
  toEmail() {
    this.navCtrl.push(ChangepasswordemailPage);
  }
}
