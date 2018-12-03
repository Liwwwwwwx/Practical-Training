import { Component } from '@angular/core';
import { NavController, IonicPage, ModalController, ToastController } from 'ionic-angular';
import { HttpClient } from "@angular/common/http";
import { TabsPage } from '../tabs/tabs';
import { Storage } from '@ionic/storage';
import { ChangepasswordPage } from '../changepassword/changepassword';
import { SignupPage } from '../signup/signup';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  isRemember: boolean = false;
  uname: string = "";
  passw: string = "";
  users;
  // path: string = "http://localhost:8000/api";
  constructor(public navCtrl: NavController,
              public modalCtrl: ModalController,
              public toastCtrl: ToastController,
              public storage: Storage,
              private http: HttpClient) {
    storage.ready().then(() => {
      storage.get('USER_INFO').then( value => {
        this.uname = !!value ? JSON.parse(value).username : '';
        this.passw = !!value ? JSON.parse(value).password : '';
        this.isRemember = !!value ? JSON.parse(value).isRemember : false;
      });
    });
  }
  // ionViewWillEnter() {
  //   if(storage.get('USER_INFO').then( value => JSON.parse(value).username)) {
  //     this.storage
  //     this.uname = JSON.parse(value).username;
  //   }
  // }
  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  // 登录
  _login(username: HTMLInputElement, password: HTMLInputElement) {
    this.http.get('/api/users').subscribe(data=>{
      this.users = data;
      console.log(this.users);
    })
    if( !username.value) {
      this.showToast('bottom','请输入用户名');
      return false;
    }
    if( !password.value) {
      this.showToast('bottom','请输入密码');
      return false;
    }
    let data = {username: username.value, password: password.value, isRemember: this.isRemember};
    // 存储用户信息
    this.storage.remove("USER_INFO");
    this.storage.set("USER_INFO",JSON.stringify(data));
    console.log(username.value,password.value,this.isRemember,this.storage);
    // 界面跳转
    let modal = this.modalCtrl.create(TabsPage, data);
    modal.present();
  }
  // 提示信息
  showToast(position: string, message: string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: position
    });
    toast.present(toast);
  }
  // 注册
  toSign() {
    this.navCtrl.push(SignupPage);
  }
  // 忘记密码
  forget() {
    this.navCtrl.push(ChangepasswordPage);
  }
}
