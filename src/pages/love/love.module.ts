import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LovePage } from './love';

@NgModule({
  declarations: [
    LovePage,
  ],
  imports: [
    IonicPageModule.forChild(LovePage),
  ],
})
export class LovePageModule {}
