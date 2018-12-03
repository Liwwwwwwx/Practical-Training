import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WenjiPage } from './wenji';

@NgModule({
  declarations: [
    WenjiPage,
  ],
  imports: [
    IonicPageModule.forChild(WenjiPage),
  ],
})
export class WenjiPageModule {}
