import { Component } from '@angular/core';
import { NavController, NavParams,ActionSheetController} from 'ionic-angular';
/**
 * Generated class for the HeadPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//@IonicPage()
@Component({
  selector: 'page-head',
  templateUrl: 'head.html',
})
export class HeadPage {

  constructor(public actionSheetCtrl: ActionSheetController,public navCtrl: NavController, public navParams: NavParams) {
  }

  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad HeadPage');
  // }
  presentModal(){
    const actionSheet = this.actionSheetCtrl.create({
      // title: 'Modify your album',
      buttons: [
        {
          text: '查看历史头像',
          cssClass: 'zm-action-button',
          role: 'destructive',
          handler: () => {
           
          }
        },{
          text: '拍照',
          cssClass: 'zm-action-button',
          handler: () => {
            console.log('Archive clicked');
          }
        },{
          text: '从相册选择照片',
          cssClass: 'zm-action-button',
          handler: () => {
            console.log('Archive clicked');
          }
        },{
          text: '取消',
          cssClass: 'zm-action-button',
          handler: () => {
            console.log('Archive clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

}
