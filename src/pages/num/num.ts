import { Component } from '@angular/core';
import {NavController, NavParams,Events ,ToastController} from 'ionic-angular';
import { HttpClient } from "@angular/common/http";
/**
 * Generated class for the NumPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-num',
  templateUrl: 'num.html',
})
export class NumPage {

  content: string = '';
  user;
  constructor( public toastCtrl: ToastController,public events: Events,public http:HttpClient,public navCtrl: NavController, public navParams: NavParams) {
    this.user = navParams.data;
    console.log(this.user);

  }

 changePhone(phoneNumber:HTMLInputElement){
    console.log(phoneNumber.value);
    if(phoneNumber.value.length==0){
      return;
    }else if (phoneNumber.value.length !== 11) {
      this.showToast('middle','请输入正确的手机号格式！');
      return ;
    }
 }
 changeEmail(email:HTMLInputElement){
  console.log(email.value);
  if(email.value.length==0){
    return;
  }else if(!(/@\S+.(com|cn)/.test(email.value))) {
    this.showToast('middle','请输入正确的邮箱格式！');
    return ;
  }
}
changeWechat(wechat:HTMLInputElement){
  console.log(wechat.value);
  if(wechat.value.length==0){
    return;
  }else if (!(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/.test(wechat.value))) {
    this.showToast('middle','请输入正确的微信账号格式！');
    return ;
  }
}
changeQq(qq:HTMLInputElement){
  console.log(qq.value);
  if(qq.value.length==0){
    return;
  }else if (qq.value.length !== 10 && qq.value.length !== 9) {
    this.showToast('middle','请输入正确的qq账号格式！');
    return ;
  }
}
  ionViewDidLoad() {
    console.log('ionViewDidLoad NumPage');
  }
  //保存
  storeMessage(phoneNumber:HTMLInputElement, email:HTMLInputElement,wechat:HTMLInputElement,qq:HTMLInputElement) {
    this.http.post('/userdata/uploadNum',{userid:this.user.userid, 
      phoneNumber:phoneNumber.value,email:email.value,wechat:wechat.value,qq:qq.value})
    .subscribe(result => {
      console.log(result);
      this.navCtrl.popToRoot().then(() => {
          this.events.publish('reloadNumPage');
        }
      );
    });
  }

  // 提示信息
  showToast(position: string, message: string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 1000,
      position: position
    });
    toast.present();
  }
}
