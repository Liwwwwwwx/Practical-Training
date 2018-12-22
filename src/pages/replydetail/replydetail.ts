import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ReplydetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-replydetail',
  templateUrl: 'replydetail.html',
})
export class ReplydetailPage {
  //是否点赞
  isClick;
  priIsClick;
  clickCount = 0;
  srcdis = "../../assets/imgs/zan1.png";
  srclike = "../../assets/imgs/zan0.png";

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReplydetailPage');
  }
  like() {
    this.clickCount = this.isClick ? this.clickCount - 1 : this.clickCount + 1;
    this.isClick = !this.isClick;
  }

}
