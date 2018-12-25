import { Component } from "@angular/core";
import { NavController, NavParams, ModalController } from "ionic-angular";
import { HttpClient } from "@angular/common/http";
import { Storage } from "@ionic/storage";
import { RespondPage } from "../respond/respond";
import { ReplydetailPage } from "../replydetail/replydetail";
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
  noteid;
  items
  content
  username
  constructor(
    public storage: Storage,
    public http: HttpClient,
    public modalCtrl: ModalController,
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
    this.noteid = navParams.data
  }
  ngOnInit() {
    this.http.post("/notedata/getcomment", { noteid: this.noteid }).subscribe(data => {
      console.log(data);
      this.items = data
    });
    this.storage.get("USER_INFO").then(value => {
      this.username = JSON.parse(value).username;
      console.log(this.username)
    });
  }
  ionViewDidLoad() {
    console.log("ionViewDidLoad CommentPage");
  }
  goRespond() {
    let modal = this.modalCtrl.create(RespondPage, { userId: 8675309 });
    modal.onDidDismiss(data => {
      console.log(data);
    });
    modal.present();
  }
  goDetail(i) {
    this.navCtrl.push(ReplydetailPage,this.items[i]);
  }
  submit(){
    console.log(this.content)
    if(this.content == undefined){
      console.log('评论不能为空')
    }else{
      this.http.post('/notedata/insertcomment',{noteid:this.noteid,username:this.username,content:this.content}).subscribe(data=>{
        console.log(data)
      })
      this.http.post("/notedata/getcomment", { noteid: this.noteid }).subscribe(data => {
        console.log(data);
        this.items = data
      });
    }

  }
}
