import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HeadPage } from './head';

@NgModule({
  declarations: [
    HeadPage,
  ],
  imports: [
    IonicPageModule.forChild(HeadPage),
  ],
})
export class HeadPageModule {}
