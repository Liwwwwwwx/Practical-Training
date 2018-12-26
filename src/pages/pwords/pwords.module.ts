import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PwordsPage } from './pwords';

@NgModule({
  declarations: [
    PwordsPage,
  ],
  imports: [
    IonicPageModule.forChild(PwordsPage),
  ],
})
export class PwordsPageModule {}
