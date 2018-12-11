import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController, ModalController } from 'ionic-angular';
import { SignupmobilePage } from '../signupmobile/signupmobile';
import { HttpClient } from '@angular/common/http';

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public toastCtrl: ToastController, public http: HttpClient) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }
  // 点击事件
  doReset(username: HTMLInputElement, password:HTMLInputElement, newpsw: HTMLInputElement, email: HTMLInputElement){
    var that = this;
    // console.log(username.value, password.value, newpsw.value, email.value);
    // 提示信息
    function showToast(message: string) {
      let toast = that.toastCtrl.create({
        message: message,
        duration: 5000,
        position: 'middle'
      });
      toast.present(toast);
    }

    // 验证用户名
    function checkUname(data) {
      return new Promise(function(resolve) {
        if(! username.value) {
          console.log('no');
          showToast('用户名不能为空！');
        } else {
          that.http.post('/signup/name',{username: username.value}).subscribe((result) => {
            if(result) {
              showToast('用户名已存在！');
            } else {
              data.username = username.value;
              resolve(data);
            }
          });
        }
      });
    }
    
    // 密码验证
    function checkPsw(data) {
      console.log(data);
      return new Promise(function(resolve) {
        if(!password.value) {
          showToast('密码不能为空！');
        } else if ((password.value.length < 6) || (password.value.length > 20)) {
          showToast('密码长度在6到20位之间！');;
        } else if(newpsw.value !== password.value) {
          showToast('两次输入密码不一致！');
        } else {
          data.password = password.value;
          resolve(data);
        }
      });
    }

    // 邮箱验证
    function checkMail(data) {
      console.log(data);
      return new Promise(function(resolve) {
        if(!email.value) {
          showToast('邮箱不能为空！');
        } else if(!(/@\S+.(com|cn)/.test(email.value))) {
          showToast('请输入正确的邮箱格式！');
        } else {
          that.http.post('/signup/email', {email: email.value}).subscribe((result) => {
            if(result) {
              showToast('该邮箱已被使用！');
            } else {
              data.email = email.value;
              // 跳转到下一页
              that.navCtrl.push(SignupmobilePage,data);
            }
          });
        }
      });
    }

    // promise对象实现同步操作
    var p = new Promise(function(resolve) {
      var data = {};// 存储注册信息
      resolve(data);
    });
    p.then(checkUname).then(checkPsw).then(checkMail).catch(function(reason){console.log(reason);});
  }
}
