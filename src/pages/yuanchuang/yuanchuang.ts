import { Component } from "@angular/core";
import { ModalController, NavController } from "ionic-angular";
import { DetailPage } from "../detail/detail";
import { HttpClient } from "@angular/common/http";

/**
 * Generated class for the YuanchuangPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//@IonicPage()
@Component({
  selector: "page-yuanchuang",
  templateUrl: "yuanchuang.html"
})
export class YuanchuangPage {
  data;
  imgs = 'imgs'
  li_content = 'li_content'
  licontent = 'licontent'
  constructor(
    public modalCtrl: ModalController,
    public http: HttpClient,
    public navCtrl: NavController
  ) {}
  ngOnInit() {
    this.http.get("/notedata").subscribe(data => {
      this.data = data;
      var note = [];
      this.data.map(function(item) {
        if (item.isnoteoriginal == 1) {
          note.push(item);
        }
      });
      this.data = note;
    });
  }
  ionViewDidLoad() {
    console.log("ionViewDidLoad YuanchuangPage");
  }
  goTog(i) {
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
}
