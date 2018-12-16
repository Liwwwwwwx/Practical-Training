import { Component } from '@angular/core';
import {NavController, NavParams } from 'ionic-angular';
import { HttpClient, HttpHeaders } from "@angular/common/http";
/**
 * Generated class for the TongxinPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-tongxin',
  templateUrl: 'tongxin.html',
})
export class TongxinPage {
  content;
  constructor(public http:HttpClient,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TongxinPage');
  }
  goAbout(){
    this.navCtrl.popToRoot();
  }
  ngOnInit(){
    this.http.get('/notedata').subscribe(data => {
      console.log(data);
      this.content = data;
      // console.log(this.content[0].userid)
    })
  }

}
