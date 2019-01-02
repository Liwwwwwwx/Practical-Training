import { Component } from "@angular/core";
import {
  NavController,
  NavParams,
  ToastController,
  Events
} from "ionic-angular";
import { HttpClient } from "@angular/common/http";
import { DetailPage } from "../detail/detail";
import { CommentPage } from "../comment/comment";
import { OtheruserPage } from "../otheruser/otheruser";

//import { Camera } from '@ionic-native/camera';

@Component({
  selector: "page-contact",
  templateUrl: "contact.html"
})
export class ContactPage {
  username: string;
  userid: number;
  items;
  note_content: string = "note_content";
  isComment = false;
  content: string = "";
  index: number;
  constructor(
    public toastCtrl: ToastController,
    public events: Events,
    public http: HttpClient,
    public navParams: NavParams,
    public navCtrl: NavController
  ) {
    this.userid = navParams.data.userid;
    this.username = navParams.data.username;
  }
  ionViewDidLoad() {
    this.http
      .post("/userdata/getmessage", { userid: this.userid })
      .subscribe(data => {
        console.log(data);
        this.items = data;
      });
  }
  gotodetail(i) {
    this.navCtrl.push(DetailPage, {
      index: i,
      noteid: this.items[i].noteid
    });
  }
  gotocomment(i) {
    this.navCtrl.push(CommentPage, {
      noteid: this.items[i].noteid,
      index: this.items[i]
    });
  }
  comment(i) {
    this.index = i;
    this.isComment = this.isComment ? false : true;
  }
  submit() {
    console.log(this.content);
    if (this.content == undefined) {
      this.showToast("bottom", "评论内容不能为空");
      return false;
    } else {
      if (this.items[this.index].com_replyid) {
        this.http
          .post("/notedata/insertonecomments", {
            noteid: this.items[this.index].noteid,
            username: this.username,
            content: this.content,
            replyid: this.items[this.index].com_replyid
          })
          .subscribe(data => {
            console.log(data);
          });
      } else {
        this.http
          .post("/notedata/insertonecomments", {
            noteid: this.items[this.index].noteid,
            username: this.username,
            content: this.content,
            replyid: this.items[this.index].replyid
          })
          .subscribe(data => {
            console.log(data);
          });
      }
      this.content = "";
      this.isComment = false
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
  goother(){
    this.navCtrl.push(OtheruserPage,{
      username: this.items[0].username,
    })
  }
}
