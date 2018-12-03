import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TongxinPage } from './tongxin';
import { ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';

@NgModule({
  declarations: [
    TongxinPage,
  ],
  imports: [
    IonicPageModule.forChild(TongxinPage),
  ],
})
export class TongxinPageModule {}
