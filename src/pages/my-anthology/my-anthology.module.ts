import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyAnthologyPage } from './my-anthology';

@NgModule({
  declarations: [
    MyAnthologyPage,
  ],
  imports: [
    IonicPageModule.forChild(MyAnthologyPage),
  ],
})
export class MyAnthologyPageModule {}
