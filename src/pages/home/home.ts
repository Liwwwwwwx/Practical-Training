import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PublishPage } from '../publish/publish';
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  content;
  constructor(public http:HttpClient,public navCtrl: NavController) {

  }
  ngOnInit(){
    this.http.get('/notedata').subscribe(data => {
      console.log(data);
      this.content = data;
      // console.log(this.content[0].userid)
    })
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
}
