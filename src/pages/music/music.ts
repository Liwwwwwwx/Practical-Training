import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { DetailPage } from "../detail/detail";
import { HttpClient } from "@angular/common/http";
/**
 * Generated class for the MusicPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//@IonicPage()
@Component({
  selector: "page-music",
  templateUrl: "music.html"
})
export class MusicPage {
  data;
  constructor(public http:HttpClient,public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    this.http.get("/notedata").subscribe(data => {
      this.data = data;
      var note = [];
      this.data.map(function(item) {
        if (item.notecategory == "音乐") {
          note.push(item);
        }
      });
      this.data = note;
      console.log(this.data)
    });
    console.log("ionViewDidLoad MusicPage");
    
  }
  goTog(i) {
    this.navCtrl.push(DetailPage,{
      index:i,
      noteid:this.data[i].noteid
    });
  }
  doRefresh(refresher) {
    console.log("Begin async operation", refresher);
    setTimeout(() => {
      console.log("Async operation has ended");
      refresher.complete();
    }, 2000);
  }
}
