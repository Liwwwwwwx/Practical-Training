import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';
import { ChangepasswordselectPage } from '../changepasswordselect/changepasswordselect';

/**
 * Generated class for the ChangepasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-changepassword',
  templateUrl: 'changepassword.html',
})
export class ChangepasswordPage {

  constructor(public navCtrl: NavController, public toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChangepasswordPage');
  }
  toNext(username: HTMLInputElement) {
    if(! username.value) {
      this.showToast('middle','请输入用户名');
      return ;
    }
    this.navCtrl.push(ChangepasswordselectPage);
  }
  showToast(position: string, message: string) {
    let toast = this.toastCtrl.create({
      position: position,
      duration: 1000,
      message: message
    });
    toast.present();
  }
}
