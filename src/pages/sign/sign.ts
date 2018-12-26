import { Component } from '@angular/core';
import {  NavController, NavParams, Events } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

/**
 * Generated class for the SignPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//@IonicPage()
@Component({
  selector: 'page-sign',
  templateUrl: 'sign.html',
})
export class SignPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public http: HttpClient, public events: Events) {
  }
  datas = this.navParams.data;
  ionViewDidLoad() {
    console.log(this.datas);
  }
  saveSign(text:HTMLInputElement) {
    console.log(text.value);
    this.http.post('/userdata/uploadSign',{userid:this.datas.userid, autograph: text.value}).subscribe(result => {
      console.log(result);
      this.navCtrl.popToRoot().then(()=>{
        this.events.publish('reloadMyPage');
      });
    });
  }
}
