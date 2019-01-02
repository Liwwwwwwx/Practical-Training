import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';
import { ChangepasswordselectPage } from '../changepasswordselect/changepasswordselect';
import { HttpClient } from '@angular/common/http';

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

  constructor(public navCtrl: NavController, public toastCtrl: ToastController, public http: HttpClient) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChangepasswordPage');
  }
  toNext(name: HTMLInputElement) {
    if(! name.value) {
      this.showToast('middle','请输入用户名');
      return ;
    }
    console.log(name.value);
    // 检测是否存在该用户或邮箱或手机号
    this.http.post('/changepsw/checkIs',{name:name.value}).subscribe(data => {
      console.log(data);
      if(!data) {
        this.showToast('middle','该账户不存在！');
        return ;
      }
      this.navCtrl.push(ChangepasswordselectPage);
    });
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
