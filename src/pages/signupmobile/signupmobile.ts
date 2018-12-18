import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController, ToastController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { HttpClient } from '@angular/common/http';

/**
 * Generated class for the SignupmobilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signupmobile',
  templateUrl: 'signupmobile.html',
})
export class SignupmobilePage {
  constructor(public navCtrl: NavController, public params: NavParams, public modalCtrl: ModalController, public toastCtrl: ToastController, public http: HttpClient) {
  }
  data: any = this.params.data;// 上一页传来的数据
  matchCode: string = '';// 验证码
  phoneNum: string = '';// 验证码对应的手机号
  ionViewDidLoad() {
    console.log(this.data);
  }
  
  // 验证码倒计时
  verifyCode: any = {
    verifyCodeTips: "获取验证码",
    countdown: 60,
    disable: true
  }

  // 倒计时函数
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
  // 验证码点击事件
  getCode(phonenum: HTMLInputElement) {
    var that = this;
    if (!phonenum.value) {
      this.showToast('middle','请填写手机号！');
      return;
    }else if (phonenum.value.length !== 11) {
      this.showToast('middle','请输入正确的手机号格式！');
      return ;
    }
    // 检测手机号是否重复
    function checkPhone(data) {
      return new Promise(function(resolve) {
        that.http.post('/signup/phone', {phonenum: phonenum.value}).subscribe(result => {
          if(result) {
            that.showToast('middle','手机号已被使用！');
          } else {
            // 存储注册信息
            data.phonenum = phonenum.value;
            console.log(that.data);
            resolve(data);
          }
        });
      });
    }
    
    //发送验证码成功后开始倒计时
    function sendCode() {
      return new Promise(function() {
        that.http.post('/phonecode',{phone: phonenum.value}).subscribe(result => {
          console.log(JSON.stringify(result));
          console.log(typeof JSON.stringify(result));
          that.matchCode = JSON.stringify(result).slice(9,15);
          that.phoneNum = JSON.stringify(result).slice(26,37);
          console.log(that.matchCode);
          console.log(that.phoneNum);
        });
        that.verifyCode.disable = false;
        that.settime();
      });
    }

    var p = new Promise(function(resolve) {
      resolve(that.data);
    });
    p.then(checkPhone).then(sendCode).catch(function(reason) {console.log(reason);});
  }
  // 点击下一步触发的函数
  finiSign(phonenum: HTMLInputElement, matchnum: HTMLInputElement) {
    // var that = this;
    if(! phonenum.value) {
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
    if(phonenum.value !== this.phoneNum) {// 匹配手机号
      this.showToast('middle','验证码输入错误！');
      return ;
    }
    if(matchnum.value !== this.matchCode) {// 匹配验证码
      this.showToast('middle','验证码输入错误！');
      return ;
    }
    // 用户数据发送
    this.http.post('/signup/newUser',this.data).subscribe(result => {
      if(result) {
        this.showToast('middle','恭喜您注册成功！');
        setTimeout(() => {
          let modal = this.modalCtrl.create(LoginPage);
          modal.present();
        }, 1000);
      } else {
        this.showToast('middle','请稍后尝试！');
      }
    });
    
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
