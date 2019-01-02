import { Component } from "@angular/core";
import { NavController, NavParams, Events } from "ionic-angular";
import { HttpClient } from "@angular/common/http";
import { OtheruserPage } from "../otheruser/otheruser";
/**
 * Generated class for the FanPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: "page-fan",
  templateUrl: "fan.html"
})
export class FanPage {
  userid;
  items;
  mutual = '<i class="iconfont">&#xe610;</i>互相关注';
  follow = "+关注";
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
      .post("/userdata/fandetail", { userid: this.userid })
      .subscribe(data => {
        console.log(data);
        this.items = data;
        this.isMutual = this.items.map(item => {
          return item.Mutual;
        });
        console.log(this.isMutual);
      });
    console.log("ionViewDidLoad FanPage");
  }
  Follow(i) {
    console.log(this.items[i].Mutual);
    this.isMutual[i] = this.isMutual[i] ? 0 : 1;
    if (this.isMutual[i]) {
      this.http
        .post("/userdata/becomeFans", { userid: this.userid,fansid:this.items[i].userid })
        .subscribe(data => {
          console.log(data);
        });
    }else{
      this.http
        .post("/userdata/disfollow", { userid: this.items[i].userid,fansid:this.userid })
        .subscribe(data => {
          console.log(data);
        });
    }
  }
  goother(){
    this.navCtrl.push(OtheruserPage,{
      username: this.items[0].username,
    })
  }
}
