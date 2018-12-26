import { Component } from "@angular/core";
import { NavController, NavParams, Events } from "ionic-angular";
import { HttpClient } from "@angular/common/http";
/**
 * Generated class for the GuanzhuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//@IonicPage()
@Component({
  selector: "page-guanzhu",
  templateUrl: "guanzhu.html"
})
export class GuanzhuPage {
  userid;
  items;
  mutual = '<i class="iconfont">&#xe610;</i>互相关注';
  follow = "已关注";
  isMutual = [];
  constructor(
    public events: Events,
    public http: HttpClient,
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
    this.userid = navParams.data;
  }

  ionViewDidLoad() {
    this.http
      .post("/userdata/followdetail", { userid: this.userid })
      .subscribe(data => {
        console.log(data);
        this.items = data;
        this.isMutual = this.items.map(item => {
          return item.Mutual;
        });
        console.log(this.isMutual);
      });
    console.log("ionViewDidLoad GuanzhuPage");
  }
  Follow(i) {
    console.log(this.items[i].Mutual);
    this.http
      .post("/userdata/disfollow", {
        userid: this.items[i].userid,
        fansid: this.userid
      })
      .subscribe(data => {
        console.log(data);
      });
    this.items.splice(i, 1);
  }
}
