import { Component } from '@angular/core';
import { NavController, ToastController, ModalController } from 'ionic-angular';
import { SignupmobilePage } from '../signupmobile/signupmobile';

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public toastCtrl: ToastController) {
  }
  params = {
    newpass: '',
    sure_pwd: ''
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  // 验证
  checkUser(username: HTMLInputElement) {
    
  }


  doReset(username: HTMLInputElement, password:HTMLInputElement, email: HTMLInputElement){
    if(! username.value) {
      this.showToast('middle','用户名不能为空！');
      return ;
    }
    if(! password.value) {
      this.showToast('middle','密码不能为空！');
      return ;
    }else if ((password.value.length < 6) || (password.value.length > 20)) {
      this.showToast('middle','密码长度在6到20位之间！');
      return ;
    }
    if (this.params.newpass !== this.params.sure_pwd) {
      this.showToast('middle','两次输入密码不一致！');
      return ;
    }
    if(! email.value) {
      this.showToast('middle','邮箱不能为空！');
      return ;
    }else if(!(/@\S+.(com|cn)/.test(email.value))) {
      this.showToast('middle','请输入正确的邮箱格式！');
      return ;
    }
    this.navCtrl.push(SignupmobilePage);
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
