import { Component } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';
import { OthersdataPage } from '../othersdata/othersdata';
import { HttpClient } from '@angular/common/http';
import { Storage } from "@ionic/storage";
import { OtherathologyPage } from '../otherathology/otherathology';

/**
 * Generated class for the OtheruserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-otheruser',
  templateUrl: 'otheruser.html',
})
export class OtheruserPage {
  data: { [x: string]: any; };
  userid: any;
  items: any;
  mutual = '<i class="iconfont">&#xe610;</i>互相关注';
  follow = "+关注";
  isMutual;
  autograph: string;
  athologyname: any;
  array: Object;
  avatar;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    public http: HttpClient,
    public events: Events,

  ) { 

  }
  datas = this.navParams.data;
  username = this.datas.username;
  name;
  ionViewDidLoad() {
    console.log('ionViewDidLoad OtheruserPage');
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

  ngOnInit() {

    //获取信息

    this.http.post("/userdata/userdetail", { name: this.username }).subscribe(result => {
      console.log(result);
      this.data = result[0];
      this.userid = result[0].userid;
      this.autograph = result[0].autograph;
      this.avatar = result[0].avatar;
      for (let key in result[0]) {
        this.data[key] = result[0][key]
      }

    });

    //获取自己的用户ID
    var that = this;
    function getName() {
      return new Promise(resolve => {
        that.storage.get("USER_INFO").then(value => {
          console.log(value);
          console.log(JSON.parse(value));
          that.name = JSON.parse(value).username;
          console.log(that.name);
          console.log("storage:", that.storage);
          resolve(that.name);
        });
      });
    }
    function getID(){
      return new Promise(resolve => {
        that.http.post("userdata/getId",{ username:that.name })
        .subscribe(result => {
          console.log(result);
        })
      });
    }
    var p = new Promise((resolve) => {
      resolve();
    });
    p.then(getName).then(getID).catch(reason => {console.log(reason);});


    //获取文集
    this.http
      .post("/notedata/anthologydetail", { name: this.username })
      .subscribe(result => {
        console.log(result);
        this.array = result;
        console.log(this.array);
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
      username: this.username,
    });
  }

  

  Follow() {
    console.log(this.items.Mutual);
    this.isMutual = this.isMutual ? 0 : 1;
    if (this.isMutual) {
      this.http
        .post("/userdata/becomeFans", { userid: this.userid,fansid:this.items.userid })
        .subscribe(data => {
          console.log(data);
        });
    }else{
      this.http
        .post("/userdata/disfollow", { userid: this.items.userid,fansid:this.userid })
        .subscribe(data => {
          console.log(data);
        });
    }
  }
}
