import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PublishPage } from '../publish/publish';
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public http:HttpClient,public navCtrl: NavController) {

  }
  ngOnInit(){
    this.http.get('/userdata').subscribe(data => {
      console.log(data);
    })
  }
 

  go(){
    this.navCtrl.push(PublishPage);
  }
}
