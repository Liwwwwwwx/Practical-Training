import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
//import { Camera } from '@ionic-native/camera';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  imgurl:string;
  @ViewChild('ac') ac;
  icons:string="camera";
  items = [];
  //isActive=true;  
  isActive=0;
  isClick(i){
    this.isActive=i;
  }
  arr=['通知','消息'];
  constructor(public navCtrl: NavController) {

  }

  

}
