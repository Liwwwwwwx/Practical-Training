import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { HttpClient } from "@angular/common/http";

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
  replyid;
  items;
  comment;
  constructor(
    public http: HttpClient,
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
    this.replyid = navParams.data.replyid;
    this.comment = navParams.data;
    console.log(this.comment)
  }

  ionViewDidLoad() {
    this.http
      .post("/notedata/getcommentsdetail", { replyid: this.replyid })
      .subscribe(data => {
        console.log(data);
        this.items = data;
      });
  }
}
