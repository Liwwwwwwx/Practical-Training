import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DreamPage } from './dream';

@NgModule({
  declarations: [
    DreamPage,
  ],
  imports: [
    IonicPageModule.forChild(DreamPage),
  ],
})
export class DreamPageModule {}
