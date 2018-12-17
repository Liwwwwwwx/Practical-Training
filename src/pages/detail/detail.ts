import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";

/**
 * Generated class for the DetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//@IonicPage()
@Component({
  selector: "page-detail",
  templateUrl: "detail.html"
})
export class DetailPage {
  item;
  index;
  contentdetail;
  imgs = "imgs";
  note_content = "note_content";
  notecontent = "note-content";
  constructor(
    params: NavParams,
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
    console.log(params.data.note);
    this.item = params.data.note;
    this.index = params.data.index;
    this.contentdetail = params.data.note.notecontent.replace(
      /(\r\n)|(\n)/g,
      "<br/>"
    );
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad DetailPage");
  }
  close() {
    this.navCtrl.pop();
  }
}
