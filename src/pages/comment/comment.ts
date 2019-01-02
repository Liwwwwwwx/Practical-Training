import { Component } from "@angular/core";
import {
  NavController,
  NavParams,
  Events,
  ModalController,
  ToastController
} from "ionic-angular";
import { HttpClient } from "@angular/common/http";
import { Storage } from "@ionic/storage";
import { ReplydetailPage } from "../replydetail/replydetail";
import { OtheruserPage } from "../otheruser/otheruser";
/**
 * Generated class for the CommentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: "page-comment",
  templateUrl: "comment.html"
})
export class CommentPage {
  noteid: any;
  items: Object;
  content: string;
  username: any;
  commentCount;
  index;
  constructor(
    public events: Events,
    public storage: Storage,
    public toastCtrl: ToastController,
    public http: HttpClient,
    public modalCtrl: ModalController,
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
    this.noteid = navParams.data.noteid;
    this.index = navParams.data.index;
  }
  ngOnInit() {
    
    this.http
      .post("/notedata/getcomment", { noteid: this.noteid })
      .subscribe(data => {
        console.log(data);
        this.items = data;
      });
    this.storage.get("USER_INFO").then(value => {
      this.username = JSON.parse(value).username;
      console.log(this.username);
    });
  }
  ionViewDidLoad() {
    this.events.subscribe("reloadCommentsCount", (i) => {
      this.items[i].commentCount = this.items[i].commentCount + 1;
    });
    console.log("ionViewDidLoad CommentPage");
  }
  goDetail(i) {
    this.navCtrl.push(ReplydetailPage, {
      item: this.items[i],
      username: this.username,
      index: i,
      commentCount:this.items[i].commentCount
    });
  }
  gootheruser(i){
    this.navCtrl.push(OtheruserPage,{
      username: this.items[i].username,
    });
  }
  submit() {
    console.log(this.content);
    if (this.content == undefined) {
      this.showToast("bottom", "评论内容不能为空");
      return false;
    } else {
      this.http
        .post("/notedata/insertcomment", {
          noteid: this.noteid,
          username: this.username,
          content: this.content
        })
        .subscribe(data => {
          console.log(data);
        });
      this.http
        .post("/notedata/getcomment", { noteid: this.noteid })
        .subscribe(data => {
          console.log(data);
          this.items = data;
        });
      this.content = "";
      this.events.publish("ChangeCommentCount", this.index);
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
}
