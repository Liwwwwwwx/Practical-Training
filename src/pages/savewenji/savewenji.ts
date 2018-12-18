import { Component } from "@angular/core";
import { NavController, NavParams, ModalController } from "ionic-angular";
import { NewPage } from "../new/new";
import { Storage } from "@ionic/storage";
import { HttpClient } from "@angular/common/http";
/**
 * Generated class for the SavewenjiPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//@IonicPage()
@Component({
  selector: "page-savewenji",
  templateUrl: "savewenji.html"
})
export class SavewenjiPage {
  username;
  data;
  selectValue;
  
  constructor(
    public http: HttpClient,
    public storage: Storage,
    public modalCtrl: ModalController,
    public navCtrl: NavController,
    public navParams: NavParams
  ) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad SavewenjiPage");
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
        .post("/notedata/anthologydetail", { name: that.username })
        .subscribe(result => {
          console.log(result);
          that.data = result;
          console.log(that.data);
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
  }
  goNew() {
    let modal = this.modalCtrl.create(NewPage, { userId: 8675309 });
    modal.onDidDismiss(data => {
      console.log(data);
    });
    modal.present();
  }
  langSelect() {
    console.log("langSelect: " + this.selectValue);
  }
}
