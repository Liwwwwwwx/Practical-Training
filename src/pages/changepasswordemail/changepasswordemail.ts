import { Component } from '@angular/core';
import {  NavController,ToastController } from 'ionic-angular';
import { ChangepasswordnewPage } from '../changepasswordnew/changepasswordnew';
import { HttpClient, HttpHeaders } from '@angular/common/http';
/**
 * Generated class for the ChangepasswordemailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//@IonicPage()
@Component({
  selector: 'page-changepasswordemail',
  templateUrl: 'changepasswordemail.html',
})
export class ChangepasswordemailPage {
  matchCode:any;// 验证码
  private headers = new HttpHeaders({'Content-Type':'application/json'});
  constructor(public navCtrl: NavController, public toastCtrl: ToastController, public http: HttpClient) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChangepasswordemailPage');
  }
  codeParam = {
    fromflag: 2,
    usermail: ""
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
  getCode(mail: HTMLInputElement) {
    if (! mail.value) {
      this.showToast('middle','请填写邮箱！');
      return;
    }else if(!(/@\S+.(com|cn)/.test(mail.value))) {
      this.showToast('middle','请输入正确的邮箱格式！');
      return ;
    }
  
    //发送验证码成功后开始倒计时
  
    this.verifyCode.disable = false;
    this.settime();
	//该部分需要进行post请求，需要时去掉注释
	// 发送验证码
    this.http.post('/mail',{mail:mail.value} ,{
      headers : this.headers,
      observe : 'body',
      responseType : 'json'
    }).subscribe( data => {
      this.matchCode = '' + data;
      console.log('typeof matchCode:',typeof this.matchCode);
      console.log(this.matchCode);
    });
    console.log('已发送！');
	
  }

  toNew(mail: HTMLInputElement, matchnum: HTMLInputElement) {
    console.log('typeof matchnum.value:',typeof matchnum.value);
    console.log(matchnum.value);
    if(! mail.value) {
      this.showToast('middle','请输入邮箱！');
      return ;
    }else if(!(/@\S+.(com|cn)/.test(mail.value))) {
      this.showToast('middle','请输入正确的邮箱格式！');
      return ;
    }
    if(! matchnum.value) {
      this.showToast('middle','请输入验证码！');
      return ;
    }
	/*
    if(matchnum.value !== this.matchCode){
      this.showToast('middle','验证码输入错误！');
      return ;
    }
	*/
    this.navCtrl.push(ChangepasswordnewPage);
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
