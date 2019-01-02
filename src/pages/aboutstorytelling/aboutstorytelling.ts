import { Component } from '@angular/core';
import { ModalController, NavController,NavParams } from "ionic-angular";
import { DetailPage } from "../detail/detail";
import { HttpClient } from "@angular/common/http";
/**
 * Generated class for the AboutstorytellingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//@IonicPage()
@Component({
  selector: 'page-aboutstorytelling',
  templateUrl: 'aboutstorytelling.html',
})
export class AboutstorytellingPage {
  data;
  imgs = 'imgs'
  constructor(public modalCtrl: ModalController,   public http: HttpClient,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutappearancePage');
  }
  goTog(i){
    console.log(this.data[i]);
    let profileModal = this.modalCtrl.create(DetailPage, {
      index: i,
      noteid:this.data[i].noteid,
    });
    profileModal.present();
  }
  doRefresh(refresher) {
    console.log("Begin async operation", refresher);
    setTimeout(() => {
      console.log("Async operation has ended");
      refresher.complete();
    }, 2000);
  }
  ngOnInit() {
    this.http.get("/notedata").subscribe(data => {
      this.data = data;
      var note = [];
      this.data.map(function(item) {
        if (item.notetag == "励志") {
          note.push(item);
        }
      });
      this.data = note;
    });
  }
}
