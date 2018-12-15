import { Component } from '@angular/core';
import { NavController, IonicPage, ModalController, ToastController } from 'ionic-angular';
import { HttpClient, HttpHeaders } from "@angular/common/http";
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

  private headers = new HttpHeaders({'Content-Type':'application/json'});// 请求头

  constructor(public navCtrl: NavController,
              public modalCtrl: ModalController,
              public toastCtrl: ToastController,
              public storage: Storage,
              private http: HttpClient) {
    // 登陆页面的缓存
    storage.ready().then(() => {
      storage.get('USER_INFO').then( value => {
        this.uname = !!value ? JSON.parse(value).username : '';
        this.passw = !!value ? JSON.parse(value).password : '';
        this.isRemember = !!value ? JSON.parse(value).isRemember : false;
      });
    });
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  
  // 点击登录
  _login(username: HTMLInputElement, password: HTMLInputElement) {
    var that = this;
    if( !username.value) {
      this.showToast('bottom','请输入用户名');
      return false;
    }
    if( !password.value) {
      this.showToast('bottom','请输入密码');
      return false;
    }

    // 存储用户信息
    let data = {username: username.value, password: password.value, isRemember: this.isRemember};
    this.storage.remove("USER_INFO");
    this.storage.set("USER_INFO",JSON.stringify(data));

    // 验证用户名是否存在
    function checkName() {
      return new Promise((resolve) => {
        that.http.post('/signup/name',{username:username.value}).subscribe(result => {
          if(!result) {
            that.showToast('bottom','用户名不存在，请重新输入！');
          } else {
            resolve();
          }
        });
      });
    }
    
    // 验证是否正确
    function checkMatch() {
      return new Promise(() => {
        that.http.post('/login/login', {name: username.value, psw: password.value}).subscribe(data => {
          console.log(data);
          if( !data) {
            that.showToast('bottom','用户名与密码不匹配，请重新输入！');
            return ;
          } else {
            // 界面跳转
            that.navCtrl.setRoot(TabsPage, data);
          }
        });
      });
    }

    // Promise
    var p = new Promise((resolve) => {
      resolve();
    });
    p.then(checkName).then(checkMatch).catch(reason => {console.log(reason);});
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
