import { Component } from '@angular/core';
import {  NavController, NavParams,ActionSheetController} from 'ionic-angular';
import { WePage } from '../we/we';
import { Storage } from '@ionic/storage';
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

  constructor(public actionSheetCtrl: ActionSheetController,public navCtrl: NavController, public navParams: NavParams, public storage: Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShezhiPage');
  }
  go(){
    this.navCtrl.push(WePage);
  }
  goto(){
    this.navCtrl.push(NumPage);
  }
  removeStorage() {
    this.actionSheetCtrl.create({
      buttons: [
        {
          text: '确认退出登录',
          cssClass: 'zm-action-button',
          role: 'destructive',
          handler: () => {
            this.storage.remove("USER_INFO");
            this.navCtrl.push(LoginPage);
          }
        },{
          text: '取消',
          cssClass: 'zm-action-button',
          handler: () => {
            console.log('Archive clicked');
          }
        }
      ]
    }).present();
  }

  goLogin(){
    const actionSheet = this.actionSheetCtrl.create({
      // title: 'Modify your album',
      buttons: [
        {
          text: '确认退出登录',
          cssClass: 'zm-action-button',
          role: 'destructive',
          handler: () => {
            this.navCtrl.push(LoginPage);
          }
        },{
          text: '取消',
          cssClass: 'zm-action-button',
          handler: () => {
            console.log('Archive clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }
}
