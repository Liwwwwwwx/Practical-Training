import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PwordsPage } from '../pwords/pwords';
import { PphotoPage } from '../pphoto/pphoto';
import { PmusicPage } from '../pmusic/pmusic';

/**
 * Generated class for the PublishPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-publish',
  templateUrl: 'publish.html',
})
export class PublishPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PublishPage');
  }
  goHome(){
    this.navCtrl.popToRoot();
  }
  goPubwords(){
    this.navCtrl.push(PwordsPage);
  }
  goPubphoto(){
    this.navCtrl.push(PphotoPage);
  }
  goPubmusic(){
    this.navCtrl.push(PmusicPage);
  }
}
