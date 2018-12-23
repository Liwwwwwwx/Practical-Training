import { Component } from '@angular/core';
import {  NavController, NavParams,ViewController, Events } from 'ionic-angular';
import {WenjiPage } from '../wenji/wenji';
import { HttpClient } from '@angular/common/http';
// import { CollectiondetailPage } from '../collectiondetail/collectiondetail';
/**
 * Generated class for the NewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//@IonicPage()
@Component({
  selector: 'page-new',
  templateUrl: 'new.html',
})
export class NewPage {

  constructor(public viewCtrl: ViewController,public navCtrl: NavController, public navParams: NavParams, public events: Events, public http:HttpClient, public params: NavParams) {
  }
  datas = this.params.data;
  ionViewDidLoad() {
    console.log('datas:', this.datas);
  }
  go(){
    let data = { 'foo': 'bar' };
    this.viewCtrl.dismiss(data);
  }
  goToa(anthology: HTMLInputElement){
    // this.navCtrl.push(CollectiondetailPage);
    console.log(anthology.value);
    console.log(this.datas.username);
    this.http.post('/notedata/newAnthology',{name: this.datas.username, anthologyName: anthology.value}).subscribe(result => {
      console.log(result);
    });
    // 返回上一页面
    this.navCtrl.pop().then(()=>{
      this.events.publish('reloadNotePage');
    });
  }
}
