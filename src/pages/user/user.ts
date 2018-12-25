import { Component } from "@angular/core";
import { NavController, NavParams, ActionSheetController, Events } from "ionic-angular";
import { HeadPage } from "../head/head";
import { SignPage } from "../sign/sign";
import { HttpClient } from "@angular/common/http";
/**
 * Generated class for the UserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: "page-user",
  templateUrl: "user.html"
})
export class UserPage {
  data;
  constructor(public navCtrl: NavController, public navParams: NavParams, public actionSheetCtrl: ActionSheetController, public http: HttpClient, public events: Events) {
      this.data = navParams.data
      console.log(this.data);
  }
  // 性别
  changeSex() {
    let actionSheet = this.actionSheetCtrl.create({
      buttons: [
        {
          text: '男',
          role: 'destructive',
          cssClass: 'zm-action-button',
          handler: () => {
            this.data.sex = '男';
          }
        },
        {
          text: '女',
          role: 'destructive',
          cssClass: 'zm-action-button',
          handler: () => {
            this.data.sex = '女';
          }
        },
        {
          text: '取消',
          role: 'cancel',
          cssClass: 'zm-action-button',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }
  // 生日
  changeBirthDate(date:HTMLInputElement) {
    console.log(date.value);
    console.log(typeof date.value);
  }
  // 保存
  saveUser(sex:HTMLInputElement, date:HTMLInputElement) {
    console.log(sex.innerHTML);
    this.http.post('/userdata/uploadUser',{userid:this.data.userid, sex:sex.innerHTML, birth:date.value}).subscribe(result => {
      console.log(result);
      this.navCtrl.popToRoot().then(() => {
          this.events.publish('reloadMyPage');
        }
      );
    });
  }
  go() {
    this.navCtrl.push(HeadPage,{userid: this.data.userid, avatar: this.data.avatar});
  }
  goto() {
    this.navCtrl.push(SignPage,{userid:this.data.userid,autograph:this.data.autograph});
  }
}
