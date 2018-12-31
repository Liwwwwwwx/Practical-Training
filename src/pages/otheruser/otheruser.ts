import { Component } from "@angular/core";
import { NavController, NavParams, Events } from "ionic-angular";
import { OthersdataPage } from "../othersdata/othersdata";
import { HttpClient } from "@angular/common/http";
import { Storage } from "@ionic/storage";
import { OtherathologyPage } from "../otherathology/otherathology";

/**
 * Generated class for the OtheruserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: "page-otheruser",
  templateUrl: "otheruser.html"
})
export class OtheruserPage {
  data: { [x: string]: any };
  userid: any;
  ouserid:number;
  items: any;
  mutual = '<i class="iconfont">&#xe610;</i>互相关注';
  follow = "已关注";
  isMutual;
  autograph: string;
  athologyname: any;
  array: Object;
  avatar;
  Mutual
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    public http: HttpClient,
    public events: Events
  ) {}
  datas = this.navParams.data;
  username = this.datas.username;
  name;

  ionViewCanEnter() {
    //获取自己的用户ID
    var that = this;
    function getName() {
      return new Promise(resolve => {
        that.storage.get("USER_INFO").then(value => {
          that.name = JSON.parse(value).username;

          resolve(that.name);
        });
      });
    }
    function getID() {
      return new Promise(resolve => {
        that.http
          .post("/userdata/getId", { username: that.name })
          .subscribe(result => {
            that.userid = result[0].userid;

            resolve(that.userid);
          });
      });
    }
    function getMutual() {
      return new Promise(resolve => {
        that.http
          .post("/userdata/getonemutual", { userid: that.userid,ouserid:that.ouserid })
          .subscribe(result => {
            that.Mutual = result[0]
            console.log(that.Mutual)
            if(result[0]){
              that.isMutual = result[0].Mutual;
            }else{
              that.follow = '+关注';
              that.isMutual = 0
            }
          });
      });
    }
    var p = new Promise(resolve => {
      resolve();
    });
    p.then(getName)
      .then(getID)
      .then(getMutual)
      .catch(reason => {
        console.log(reason);
      });
  }

  ngOnInit() {
    //获取信息

    this.http
      .post("/userdata/userdetail", { name: this.username })
      .subscribe(result => {
        this.data = result[0];
        this.ouserid = result[0].userid;
        this.autograph = result[0].autograph;
        this.avatar = result[0].avatar;
        for (let key in result[0]) {
          this.data[key] = result[0][key];
        }
      });

    //获取文集
    this.http
      .post("/notedata/anthologydetail", { name: this.username })
      .subscribe(result => {
        this.array = result;
      });
  }

  goLast() {
    this.navCtrl.pop();
  }
  godata() {
    this.navCtrl.push(OthersdataPage);
  }
  gotoathology(i) {
    this.navCtrl.push(OtherathologyPage, {
      anthologyid: this.array[i].anthologyid,
      anthologyname: this.array[i].anthologyname,
      userid: this.array[i].userid,
      username: this.username
    });
  }

  Follow() {
    console.log(this.isMutual);
    if (this.follow == '+关注' && this.isMutual == 0) {
      this.http
        .post("/userdata/becomeFans", {
          userid: this.userid,
          fansid: this.ouserid
        })
        .subscribe(data => {
          console.log(data);
        });
        if(!this.Mutual){
          this.follow = '已关注'
        }else{
          this.isMutual = 1
        }
    } else {
      this.http
        .post("/userdata/disfollow", {
          userid: this.ouserid,
          fansid: this.userid
        })
        .subscribe(data => {
          console.log(data);
        });
        this.isMutual = 0;
        this.follow = '+关注'
    }
  }
}
