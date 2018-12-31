import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyPicturesPage } from './my-pictures';

@NgModule({
  declarations: [
    MyPicturesPage,
  ],
  imports: [
    IonicPageModule.forChild(MyPicturesPage),
  ],
})
export class MyPicturesPageModule {}
