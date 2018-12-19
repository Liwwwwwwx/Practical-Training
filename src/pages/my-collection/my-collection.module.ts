import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyCollectionPage } from './my-collection';

@NgModule({
  declarations: [
    MyCollectionPage,
  ],
  imports: [
    IonicPageModule.forChild(MyCollectionPage),
  ],
})
export class MyCollectionPageModule {}
