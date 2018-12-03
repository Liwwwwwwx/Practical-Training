import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController } from 'ionic-angular';
import {NewPage } from '../new/new';

/**
 * Generated class for the WenjiPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-wenji',
  templateUrl: 'wenji.html',
})
export class WenjiPage {

  constructor(public modalCtrl: ModalController,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WenjiPage');
  }
  goNew(){
    let modal = this.modalCtrl.create(NewPage,{userId:8675309});
    modal.onDidDismiss(data=>{
      console.log(data);
    })
    modal.present();
  }
}
