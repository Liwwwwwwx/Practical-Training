import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,ModalController} from 'ionic-angular';
import {HeaddetailPage } from '../headdetail/headdetail';
/**
 * Generated class for the HeadPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-head',
  templateUrl: 'head.html',
})
export class HeadPage {

  constructor(public modalCtrl: ModalController,public navCtrl: NavController, public navParams: NavParams) {
  }

  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad HeadPage');
  // }
  presentModal(){
    let modal = this.modalCtrl.create(HeaddetailPage,{userId:8675309});
    modal.onDidDismiss(data=>{
      console.log(data);
    })
    modal.present();
  }

}
