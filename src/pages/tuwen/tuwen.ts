import { Component } from '@angular/core';
import { ModalController,NavController } from 'ionic-angular';
import { DetailPage } from '../detail/detail';
import { HttpClient } from "@angular/common/http";
/**
 * Generated class for the TuwenPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//@IonicPage()
@Component({
  selector: 'page-tuwen',
  templateUrl: 'tuwen.html',
})
export class TuwenPage {
  data;
  constructor(public http: HttpClient,public modalCtrl: ModalController,public navCtrl: NavController) {
  }
  ngOnInit() {
    this.http.get("/notedata").subscribe(data => {
      this.data = data;
      var note = [];
      this.data.map(function(item) {
        if (item.notecategory == '图文') {
          note.push(item);
          
        }
      });
      this.data = note;
    });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad TuwenPage');
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
    console.log('Begin async operation', refresher);
    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }
}
