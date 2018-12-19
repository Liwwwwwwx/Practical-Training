import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams,ModalController } from "ionic-angular";
import { Storage } from "@ionic/storage";
import { HttpClient } from "@angular/common/http";
import { NewPage } from "../new/new";

/**
 * Generated class for the MyAnthologyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-my-anthology",
  templateUrl: "my-anthology.html"
})
export class MyAnthologyPage {
  constructor(
    public modalCtrl:ModalController,
    public http: HttpClient,
    public storage: Storage,
    public navCtrl: NavController,
    public navParams: NavParams
  ) {}
  data
  username
  ionViewDidLoad() {
    console.log("ionViewDidLoad MyAnthologyPage");
  }
  go(i){
    console.log(this.data[i])
    this.http
    .post("/notedata/getanthologynote", { anthologyid: this.data[i].anthologyid })
    .subscribe(result => {
      console.log(result);
      
    });
  }
  goNew() {
    let modal = this.modalCtrl.create(NewPage);
    modal.present();
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
    function getAnthologyInfo() {
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
      .then(getAnthologyInfo)
      .catch(reason => {
        console.log(reason);
      });
  }
}
