import { Component, ViewChild } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { ShezhiPage } from "../shezhi/shezhi";
import { FanPage } from "../fan/fan";
import { UserPage } from "../user/user";
import { SignPage } from "../sign/sign";
import { GuanzhuPage } from "../guanzhu/guanzhu";
import { CollectPage } from "../collect/collect";
import { WenjiPage } from "../wenji/wenji";
import { Storage } from "@ionic/storage";
import { HttpClient } from "@angular/common/http";
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
  data;
  @ViewChild("ac") ac;
  icons: string = "wenji";

  constructor(
    public http: HttpClient,
    public storage: Storage,
    public navCtrl: NavController,
    public navParams: NavParams
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
      that.http.post("/userdata/userdetail",{name:that.username}).subscribe(result => {
        console.log(result);
        that.data = result[0];
      });
    }
    var p = new Promise((resolve) => {
      resolve();
    });
    p.then(getName).then(getUserInfo).catch(reason => {console.log(reason);});
    
  }
  go() {
    this.navCtrl.push(ShezhiPage);
  }
  goto() {
    this.navCtrl.push(FanPage);
  }
  goTo() {
    this.navCtrl.push(UserPage);
  }
  goSign() {
    this.navCtrl.push(SignPage);
  }
  goGuanzhu() {
    this.navCtrl.push(GuanzhuPage);
  }
  goCollect() {
    this.navCtrl.push(CollectPage);
  }
  goWenji() {
    this.navCtrl.push(WenjiPage);
  }
}
