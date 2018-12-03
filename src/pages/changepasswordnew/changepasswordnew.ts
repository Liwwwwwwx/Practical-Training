import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController, ModalController } from 'ionic-angular';
import { LoginPage } from '../login/login';

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

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public toastCtrl: ToastController) {
  }

  params = {
    newpass: '',
    sure_pwd: ''
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChangepasswordnewPage');
  }
  doReset(){
    if(! this.params.newpass) {
      this.showToast('middle','请输入新的密码！');
      return ;
    }
    if (this.params.newpass == this.params.sure_pwd) {
      this.showToast('middle','恭喜您修改成功！');
      setTimeout(()=>{
        // this.navCtrl.popToRoot();
        let modal = this.modalCtrl.create(LoginPage);
        modal.present();
      },1000);
    } else {
    // console.debug("两次密码输入不一致");
    this.showToast('middle','两次密码输入不一致！');
    }
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
