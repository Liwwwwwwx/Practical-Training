import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PmusicPage } from './pmusic';

@NgModule({
  declarations: [
    PmusicPage,
  ],
  imports: [
    IonicPageModule.forChild(PmusicPage),
  ],
})
export class PmusicPageModule {}
