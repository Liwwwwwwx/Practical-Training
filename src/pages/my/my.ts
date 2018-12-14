import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ShezhiPage } from '../shezhi/shezhi';
import { FanPage } from '../fan/fan';
import { UserPage } from '../user/user';
import { SignPage } from '../sign/sign';
import { GuanzhuPage } from '../guanzhu/guanzhu';
import { CollectPage } from '../collect/collect';
import { WenjiPage } from '../wenji/wenji';
/**
 * Generated class for the MyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-my',
  templateUrl: 'my.html',
})
export class MyPage {

  @ViewChild('ac') ac;
  icons:string="wenji";

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyPage');
  }
  go(){
    this.navCtrl.push(ShezhiPage);
  }
  goto(){
    this.navCtrl.push(FanPage);
  }
  goTo(){
    this.navCtrl.push(UserPage);
  }
  goSign(){
    this.navCtrl.push(SignPage);
  }
  goGuanzhu(){
    this.navCtrl.push(GuanzhuPage);
  }
  goCollect(){
    this.navCtrl.push(CollectPage);
  }
  goWenji(){
    this.navCtrl.push(WenjiPage);
  }
}
