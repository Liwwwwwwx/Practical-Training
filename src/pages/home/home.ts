import { Component } from "@angular/core";
import { ModalController, NavController, Events } from "ionic-angular";
import { Storage } from "@ionic/storage";
import { PublishPage } from "../publish/publish";
import { DetailPage } from "../detail/detail";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  data;
  textcontent;
  image = "image";
  note_content = "note_content";
  notecontent = "note-content";
  constructor(
    public storage: Storage,
    public http: HttpClient,
    public modalCtrl: ModalController,
    public navCtrl: NavController,
    public events: Events
  ) {}
  isClick: Boolean = false;
  ngOnInit() {
    this.http.get("/notedata").subscribe(data => {
      console.log(data);
      this.data = data;
      this.textcontent = this.data.map(function(item) {
        return item.notecontent.replace(/(\r\n)|(\n)/g, "<br/>");
      });
      this.events.subscribe("reloadNotePage", () => {
        this.http.get("/notedata").subscribe(data => {
          this.data = data;
          this.textcontent = this.data.map(function(item) {
            return item.notecontent.replace(/(\r\n)|(\n)/g, "<br/>");
          });
        });
      });
      this.events.subscribe("reloadCollectionCount", (index,isCol) => {
        this.data[index].collectionCount = isCol?this.data[index].collectionCount +1:this.data[index].collectionCount - 1;
      });
      this.events.subscribe("ChangeCommentCount", (index) => {
        this.data[index].commentCount = this.data[index].commentCount + 1;
      });
    });
  }
  // doRefresh(refresher) {
  //   // console.log('Begin async operation', refresher);

  //   setTimeout(() => {
  //     // console.log('Async operation has ended');
  //     refresher.complete();
  //   }, 2000);
  // }

  go() {
    this.navCtrl.push(PublishPage);
  }
  FullScreen(i) {
    console.log(this.data[i]);
    let profileModal = this.modalCtrl.create(DetailPage, {
      index: i,
      noteid:this.data[i].noteid,
    });
    profileModal.present();
  }
}
