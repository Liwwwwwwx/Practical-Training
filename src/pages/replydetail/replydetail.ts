import { Component } from "@angular/core";
import {
  NavController,
  NavParams,
  Events,
  ToastController
} from "ionic-angular";
import { HttpClient } from "@angular/common/http";
import { OtheruserPage } from "../otheruser/otheruser";

/**
 * Generated class for the ReplydetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: "page-replydetail",
  templateUrl: "replydetail.html"
})
export class ReplydetailPage {
  replyid: any;
  items: Object;
  comment: any;
  content: any;
  username: string;
  index
  commentCount

  constructor(
    public events: Events,
    public toastCtrl: ToastController,
    public http: HttpClient,
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
    this.replyid = navParams.data.item.replyid;
    this.comment = navParams.data.item;
    this.username = navParams.data.username;
    this.index = navParams.data.index;
    this.commentCount = navParams.data.commentCount;
    console.log(this.comment, this.username);
  }

  ionViewDidLoad() {
    this.http
      .post("/notedata/getcommentsdetail", { replyid: this.replyid })
      .subscribe(data => {
        console.log(data);
        this.items = data;
      });
  }
  submit() {
    console.log(this.content);
    if (this.content == undefined) {
      this.showToast("bottom", "评论内容不能为空");
      return false;
    } else {
      this.http
        .post("/notedata/insertonecomments", {
          noteid: this.comment.noteid,
          username: this.username,
          content: this.content,
          replyid: this.replyid
        })
        .subscribe(data => {
          console.log(data);
        });
      this.http
        .post("/notedata/getcommentsdetail", { replyid: this.replyid })
        .subscribe(data => {
          console.log(data);
          this.items = data;
        });
      this.content = "";
      this.events.publish("ChangeCommentCount",this.index);
      this.events.publish("reloadCommentsCount",this.index);
      this.events.publish("CommentCount");
    }
  }
  // 提示信息
  showToast(position: string, message: string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: position
    });
    toast.present(toast);
  }
  goother(i){
    this.navCtrl.push(OtheruserPage,{
      username: this.items[i].username,
    })
  }
  goothers(){
    this.navCtrl.push(OtheruserPage,{
      username: this.items[0].username,
    })
  }
}
