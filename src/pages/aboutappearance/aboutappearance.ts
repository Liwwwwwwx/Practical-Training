import { Component } from '@angular/core';
import { ModalController, NavController,NavParams } from "ionic-angular";
import { DetailPage } from "../detail/detail";
import { HttpClient } from "@angular/common/http";

/**
 * Generated class for the AboutappearancePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//@IonicPage()
@Component({
  selector: 'page-aboutappearance',
  templateUrl: 'aboutappearance.html',
})
export class AboutappearancePage {
  data;
  constructor(public modalCtrl: ModalController,   public http: HttpClient,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutappearancePage');
  }
  goTog(i){
    console.log(this.data[i]);
    let profileModal = this.modalCtrl.create(DetailPage, {
      index: i,
      note: this.data[i]
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
        if (item.notestyle == "状物") {
          note.push(item);
        }
      });
      this.data = note;
    });
  }
}
