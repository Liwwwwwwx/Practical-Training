import { Component } from '@angular/core';
import {  NavController, NavParams,ActionSheetController} from 'ionic-angular';
import { WePage } from '../we/we';
import { AdvicePage } from '../advice/advice';
import { NumPage } from '../num/num';
import { TologinPage } from '../tologin/tologin';
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

  constructor(public actionSheetCtrl: ActionSheetController,public navCtrl: NavController, public navParams: NavParams) {
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
