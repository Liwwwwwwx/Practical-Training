import { Component } from '@angular/core';
import {  NavController, NavParams ,ModalController} from 'ionic-angular';
import { WePage } from '../we/we';
import { AdvicePage } from '../advice/advice';
import { NumPage } from '../num/num';
import { TologinPage } from '../tologin/tologin';
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

  constructor(public modalCtrl: ModalController,public navCtrl: NavController, public navParams: NavParams) {
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
    let modal = this.modalCtrl.create(TologinPage,{userId:8675309});
    modal.onDidDismiss(data=>{
      console.log(data);
    })
    modal.present();
  }
}
