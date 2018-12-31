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
  autograph: string;
  athologyname: any;
  array: Object;
  avatar;
  constructor(
    public navCtrl: NavController,
    public params: NavParams,
    public storage: Storage,
    public http: HttpClient,
    public events: Events,

  ) { }
  datas = this.params.data;
  username = this.datas.username;

  ionViewDidLoad() {
    console.log(this.username);
    console.log('ionViewDidLoad OtheruserPage');
    console.log(this.datas);
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
}
