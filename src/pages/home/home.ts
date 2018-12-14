import { Component } from '@angular/core';
import { ModalController, NavParams, NavController,  } from 'ionic-angular';
import { PublishPage } from '../publish/publish';
import { DetailPage } from '../detail/detail'
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  className:String = 'card'
  constructor(public http:HttpClient,public modalCtrl: ModalController,public navCtrl: NavController) {

  }
  isClick:Boolean = false;
  ngOnInit(){
    // this.http.get('/notedata').subscribe(data => {
    //   console.log(data);
    //   this.content = data;
    //   // console.log(this.content[0].userid)
    // })
  }
  // doRefresh(refresher) {
  //   // console.log('Begin async operation', refresher);

  //   setTimeout(() => {
  //     // console.log('Async operation has ended');
  //     refresher.complete();
  //   }, 2000);
  // }

  go(){
    this.navCtrl.push(PublishPage);
  }
  FullScreen(){
    this.isClick = !this.isClick;
    this.className = this.isClick?'card_container':'card';
    console.log(this.isClick,this.className)
    let profileModal = this.modalCtrl.create(DetailPage, { userId: 8675309 });
   profileModal.present();
  }
  
}

