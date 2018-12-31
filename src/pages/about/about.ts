import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { YuanchuangPage } from '../yuanchuang/yuanchuang';
import {TuwenPage } from '../tuwen/tuwen';
import {MusicPage } from '../music/music';
//import {AllPage } from '../all/all';
import { TongxinPage } from '../tongxin/tongxin';
import { DreamPage } from '../dream/dream';
import { LovePage } from '../love/love';
import { SearchPage } from '../search/search';

import { AboutlyricsPage } from '../aboutlyrics/aboutlyrics';
import { AboutappearancePage } from '../aboutappearance/aboutappearance';
import { AboutsceneryPage } from '../aboutscenery/aboutscenery';
import { AboutnarrationPage } from '../aboutnarration/aboutnarration';
import { AboutstorytellingPage } from '../aboutstorytelling/aboutstorytelling';
@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  constructor(public navCtrl: NavController) {

  }
  goToa(){
    this.navCtrl.push(YuanchuangPage);
  }
  goTob(){
    this.navCtrl.push(TuwenPage);
  }
  goToc(){
    this.navCtrl.push(MusicPage);
  }
  goTod(){
    this.navCtrl.push(AboutstorytellingPage);
  }
  goToe(){
    this.navCtrl.push(TongxinPage);
  }
  goTof(){
    this.navCtrl.push(DreamPage);
  }
  goTog(){
    this.navCtrl.push(LovePage);
  }
  goToh(){
    this.navCtrl.push(SearchPage);
  }
  goToi(){
    this.navCtrl.push(AboutsceneryPage);
  }
  goToj(){
    this.navCtrl.push(AboutappearancePage);
  }
  goTok(){
    this.navCtrl.push(AboutlyricsPage);
  }
  goTom(){
    this.navCtrl.push(AboutnarrationPage);
  }
}
