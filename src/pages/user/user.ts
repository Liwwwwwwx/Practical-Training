import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { HeadPage } from "../head/head";
import { SignPage } from "../sign/sign";
/**
 * Generated class for the UserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: "page-user",
  templateUrl: "user.html"
})
export class UserPage {
  data;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
      this.data = navParams.data
  }

  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad UserPage');
  // }
  go() {
    this.navCtrl.push(HeadPage,this.data.avatar);
  }
  goto() {
    this.navCtrl.push(SignPage,this.data.autograph);
  }
}
