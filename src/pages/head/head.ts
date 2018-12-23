import { Component } from '@angular/core';
import { NavController, NavParams ,ModalController, ActionSheetController, Events} from 'ionic-angular';
import $ from 'jquery';
import { HttpClient } from '@angular/common/http';
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
  avatar;
  userid;
  constructor(public modalCtrl: ModalController,public navCtrl: NavController, public navParams: NavParams, public actionSheetCtrl: ActionSheetController, public http: HttpClient, public events: Events) {
    this.avatar = navParams.data.avatar;
    this.userid = navParams.data.userid;
    console.log(navParams.data);
  }
  // 上拉菜单
  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      buttons: [
        {
          text: '拍照',
          role: 'destructive',
          cssClass: 'zm-action-button',
          handler: () => {
            
          }
        },
        {
          text: '从相册选择照片',
          role: 'destructive',
          cssClass: 'zm-action-button',
          handler: () => {
            $('#file_upload').click();
          }
        },
        {
          text: '查看历史头像',
          role: 'destructive',
          cssClass: 'zm-action-button',
          handler: () => {
            
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
  // 显示图片
  showPhoto(e) {
    console.log($('#file_upload')[0].value);
    if(! $('#file_upload')[0].value) {
      console.log('未上传图片');
      return ;
    }
    var datas;
    var that = this;
    function uploadByForm() {
      return new Promise((resolve) => {
        var formData = new FormData($("#headForm")[0]);
        console.log(formData);
        that.http.post('/upload',formData).subscribe(result => {
          datas = result;
          console.log(datas);
          resolve(datas);
        });
      });
    }
    function uploadHead(datas) {
      datas.userid = that.userid;
      that.http.post('/userdata/uploadHead',datas).subscribe(result => {
        // 没有做完
        console.log(result);
        that.navCtrl.popToRoot().then(()=>{
          that.events.publish('reloadMyPage');
        });
      })
    }

    var p = new Promise((resolve) => {
      resolve();
    });
    p.then(uploadByForm).then(uploadHead).catch(reason =>{ console.log(reason); });
  }
}
