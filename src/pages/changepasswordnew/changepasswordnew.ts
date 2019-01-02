import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController, ModalController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { HttpClient } from '@angular/common/http';

/**
 * Generated class for the ChangepasswordnewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-changepasswordnew',
  templateUrl: 'changepasswordnew.html',
})
export class ChangepasswordnewPage {

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public toastCtrl: ToastController, public http: HttpClient, public params: NavParams) {
  }
  datas = this.params.data;
  ionViewDidLoad() {
    console.log(this.datas);
  }
  doReset(password: HTMLInputElement, repsw: HTMLInputElement){
    if(!password.value) {
      this.showToast('middle','请输入新的密码！');
      return ;
    }
    if (password.value !== repsw.value) {
      this.showToast('middle','两次密码输入不一致！');
      return ;
    }
    this.datas.password = password.value;
    console.log(this.datas)
    this.http.post('/userdata/changepsw', {phone:this.datas.phonenum,newpsw:this.datas.password}).subscribe(result => {
      console.log(result);
      if(result) {
        this.showToast('middle','恭喜您修改成功！');
        setTimeout(()=>{
          let modal = this.modalCtrl.create(LoginPage);
          modal.present();
        },1000);
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
