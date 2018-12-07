import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController } from 'ionic-angular';
import {NewPage } from '../new/new';
/**
 * Generated class for the SavewenjiPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-savewenji',
  templateUrl: 'savewenji.html',
})
export class SavewenjiPage {

  constructor(public modalCtrl: ModalController,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SavewenjiPage');
  }
  goNew(){
    let modal = this.modalCtrl.create(NewPage,{userId:8675309});
    modal.onDidDismiss(data=>{
      console.log(data);
    })
    modal.present();
  }

}
