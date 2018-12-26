import { Component } from "@angular/core";
import {
  NavController,
  NavParams,
  ModalController,
  Events
} from "ionic-angular";
import { DetailPage } from "../detail/detail";
import { HttpClient } from "@angular/common/http";

/**
 * Generated class for the MyCollectionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: "page-my-collection",
  templateUrl: "my-collection.html"
})
export class MyCollectionPage {
  data;
  userid;
  imgs = "imgs";
  li_content = "li_content";
  licontent = "licontent";
  index
  constructor(
    public http: HttpClient,
    public modalCtrl: ModalController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public events: Events
  ) {
    console.log(navParams);
    this.userid = navParams.data;
  }

  ionViewDidLoad() {
    this.http
      .post("/notedata/mycollection", { userid: this.userid })
      .subscribe(result => {
        this.data = result;
        console.log(this.data);
      });
    this.events.subscribe('ReloadMyCollection', ()=>{
      this.data.splice(this.index,1)
    })
    
  }
  goTog(i) {
    console.log(this.data[i]);
    this.index = i
    let profileModal = this.modalCtrl.create(DetailPage, {
      index: i,
      note: this.data[i]
    });
    profileModal.present();
  }
}
