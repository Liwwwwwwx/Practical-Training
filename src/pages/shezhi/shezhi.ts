import { Component } from '@angular/core';
import { App,NavController, NavParams } from 'ionic-angular';
import { WePage } from '../we/we';
import { AdvicePage } from '../advice/advice';
import { NumPage } from '../num/num';
import { LoginPage } from '../login/login';
/**
 * Generated class for the ShezhiPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-shezhi',
  templateUrl: 'shezhi.html',
})
export class ShezhiPage {

  constructor(public app:App,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShezhiPage');
  }
  go(){
    this.navCtrl.push(WePage);
  }
  goTo(){
    this.navCtrl.push(AdvicePage);
  }
  goto(){
    this.navCtrl.push(NumPage);
  }
  goLogin(){
    this.app.getRootNavs()[0].setRoot(LoginPage);
  }
}
