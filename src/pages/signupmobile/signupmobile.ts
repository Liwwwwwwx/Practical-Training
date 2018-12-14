import { Component } from '@angular/core';
import {  NavController, ModalController, ToastController } from 'ionic-angular';
import { LoginPage } from '../login/login';

/**
 * Generated class for the SignupmobilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//@IonicPage()
@Component({
  selector: 'page-signupmobile',
  templateUrl: 'signupmobile.html',
})
export class SignupmobilePage {

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupmobilePage');
  }
  codeParam = {
    fromflag: 2,
    usertel: ""
  }
  // 验证码倒计时
  verifyCode: any = {
    verifyCodeTips: "获取验证码",
    countdown: 60,
    disable: true
  }
  // 倒计时
  settime() {
    if (this.verifyCode.countdown == 1) {
    this.verifyCode.countdown = 60;
    this.verifyCode.verifyCodeTips = "获取验证码";
    this.verifyCode.disable = true;
    return;
    } else {
    this.verifyCode.countdown--;
    }

    this.verifyCode.verifyCodeTips = "重新获取(" + this.verifyCode.countdown + ")";
    setTimeout(() => {
    this.verifyCode.verifyCodeTips = "重新获取(" + this.verifyCode.countdown + ")";
    this.settime();
    }, 1000);
  }
  getCode(phonenum: HTMLInputElement) {
    if (this.codeParam.usertel == '') {
      this.showToast('middle','请填写手机号！');
      return;
    }else if (phonenum.value.length !== 11) {
      this.showToast('middle','请输入正确的手机号格式！');
      return ;
    }
  
    //发送验证码成功后开始倒计时
  
    this.verifyCode.disable = false;
    this.settime();
  
  }
  finiSign(phonenum: HTMLInputElement, matchnum: HTMLInputElement) {
    if(! this.codeParam.usertel) {
      this.showToast('middle','请输入手机号！');
      return ;
    }else if (phonenum.value.length !== 11) {
      this.showToast('middle','请输入正确的手机号格式！');
      return ;
    }
    if(! matchnum.value) {
      this.showToast('middle','请输入验证码！');
      return ;
    }
    this.showToast('middle','恭喜您注册成功！');
    setTimeout(() => {
      let modal = this.modalCtrl.create(LoginPage);
      modal.present();
    }, 1000);
  }
  // 提示信息
  showToast(position: string, message: string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 1000,
      position: position
    });
    toast.present(toast);
  }
}
