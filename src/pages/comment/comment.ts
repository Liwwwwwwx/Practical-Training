import { Component } from '@angular/core';
import {NavController, NavParams,ModalController } from 'ionic-angular';
import { RespondPage } from '../respond/respond';
import { ReplydetailPage } from '../replydetail/replydetail';
/**
 * Generated class for the CommentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-comment',
  templateUrl: 'comment.html',
})
export class CommentPage {

  constructor(public modalCtrl: ModalController,public navCtrl: NavController, public navParams: NavParams) {
  }
  ngOnInit(){
    // this.http.get('/notedata').subscribe(data => {
    //   console.log(data);
    //   this.content = data;
    //   // console.log(this.content[0].userid)
    // })
  }
   //是否点赞
   isClick;
   priIsClick;
   clickCount = 0;
   srcdis = "../../assets/imgs/zan1.png";
   srclike = "../../assets/imgs/zan0.png";
  ionViewDidLoad() {
    console.log('ionViewDidLoad CommentPage');
  }
  goRespond(){
    let modal = this.modalCtrl.create(RespondPage,{userId:8675309});
    modal.onDidDismiss(data=>{
      console.log(data);
    })
    modal.present();
  }
  goDetail(){
    this.navCtrl.push(ReplydetailPage);
  }
  like() {
    this.clickCount = this.isClick ? this.clickCount - 1 : this.clickCount + 1;
    this.isClick = !this.isClick;
  }
}
