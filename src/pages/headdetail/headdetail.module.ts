import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HeaddetailPage } from './headdetail';

@NgModule({
  declarations: [
    HeaddetailPage,
  ],
  imports: [
    IonicPageModule.forChild(HeaddetailPage),
  ],
})
export class HeaddetailPageModule {}
