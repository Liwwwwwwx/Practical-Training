import { Component } from '@angular/core';
import {NavController, NavParams,ViewController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
// import {HeaPage } from '../sign/sign';

//@IonicPage()
@Component({
  selector: 'page-headdetail',
  templateUrl: 'headdetail.html',
})
export class HeaddetailPage {
  imgUrl:string;
  constructor(public camera:Camera,public viewCtrl: ViewController,public navCtrl: NavController, public navParams: NavParams) {
  }
  go(){
    let data = { 'foo': 'bar' };
    this.viewCtrl.dismiss(data);
   }
   takePhoto(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    
    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):
     let base64Image = 'data:image/jpeg;base64,' + imageData;
     this.imgUrl=base64Image;
    }, (err) => {
     // Handle error
    });
  }
  

}
