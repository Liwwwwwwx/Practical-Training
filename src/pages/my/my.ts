import { Component } from "@angular/core";
import { NavController, NavParams, Events } from "ionic-angular";
import { ShezhiPage } from "../shezhi/shezhi";
import { FanPage } from "../fan/fan";
import { UserPage } from "../user/user";
import { SignPage } from "../sign/sign";
import { GuanzhuPage } from "../guanzhu/guanzhu";
import { CollectPage } from "../collect/collect";
import { WenjiPage } from "../wenji/wenji";
import { Storage } from "@ionic/storage";
import { HttpClient } from "@angular/common/http";
import { ContactPage } from "../contact/contact";
import { AdvicePage } from "../advice/advice";
import { MyAnthologyPage } from "../my-anthology/my-anthology";
import { MyCollectionPage } from "../my-collection/my-collection";
/**
 * Generated class for the MyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: "page-my",
  templateUrl: "my.html"
})
export class MyPage {
  username;
  data = {};
  avatar;
  userid;
  autograph;
  constructor(
    public http: HttpClient,
    public storage: Storage,
    public navCtrl: NavController,
    public navParams: NavParams,
    public events: Events
  ) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad MyPage");
  }
  ngOnInit() {
    var that = this;
    function getName() {
      return new Promise(resolve => {
        that.storage.get("USER_INFO").then(value => {
          console.log(value);
          console.log(JSON.parse(value));
          that.username = JSON.parse(value).username;
          console.log("storage:", that.storage);
          resolve(that.username);
        });
      });
    }
    function getUserInfo() {
      that.http
        .post("/userdata/userdetail", { name: that.username })
        .subscribe(result => {
          console.log(result);
          that.data = result[0];
          that.userid = result[0].userid;
          that.autograph = result[0].autograph;
          for (let key in result[0]) {
            that.data[key] = result[0][key];
          }
        });
    }
    var p = new Promise(resolve => {
      resolve();
    });
    p.then(getName)
      .then(getUserInfo)
      .catch(reason => {
        console.log(reason);
      });
    // 刷新后重新加载
    this.events.subscribe("reloadMyPage", () => {
      p.then(getName)
        .then(getUserInfo)
        .catch(reason => {
          console.log(reason);
        });
    });
  }

  go() {
    this.navCtrl.push(ShezhiPage);
    console.log(this.data);
  }
  goto() {
    this.navCtrl.push(FanPage, this.userid);
  }
  goTo() {
    this.navCtrl.push(UserPage, this.data);
  }
  goSign() {
    this.navCtrl.push(SignPage, {
      userid: this.userid,
      autograph: this.autograph
    });
  }
  goGuanzhu() {
    this.navCtrl.push(GuanzhuPage, this.userid);
  }
  goCollect() {
    this.navCtrl.push(CollectPage);
  }
  goWenji() {
    this.navCtrl.push(WenjiPage);
  }
  gocontact() {
    this.navCtrl.push(ContactPage, {
      userid: this.userid,
      username: this.username
    });
  }
  goAdvice() {
    this.navCtrl.push(AdvicePage);
  }
  goAnthology() {
    this.navCtrl.push(MyAnthologyPage, this.data);
  }
  goCollection() {
    this.navCtrl.push(MyCollectionPage, this.userid);
  }
}
