import { Component } from '@angular/core';
import { ModalController, NavController, Events,  } from 'ionic-angular';
import { PublishPage } from '../publish/publish';
import { DetailPage } from '../detail/detail'
import { HttpClient,  } from "@angular/common/http";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  data
  textcontent
  image='image'
  note_content = 'note_content'
  notecontent = 'note-content'
  constructor(public http:HttpClient,public modalCtrl: ModalController,public navCtrl: NavController,public events: Events) {

  }
  isClick:Boolean = false;
  ngOnInit(){
    this.http.get('/notedata').subscribe(data => {
      console.log(data);
      this.data = data; 
      this.textcontent = this.data.map(function(item){
        return item.notecontent.replace(/(\r\n)|(\n)/g,'<br/>')
      })
      this.events.subscribe('reloadNotePage', () => {
        this.http.get('/notedata').subscribe(data => {
          console.log('刷新后的数据：',data);
          this.data = data; 
          this.textcontent = this.data.map(function(item){
            return item.notecontent.replace(/(\r\n)|(\n)/g,'<br/>')
          })
        })
      });
    })
  }
  // doRefresh(refresher) {
  //   // console.log('Begin async operation', refresher);

  //   setTimeout(() => {
  //     // console.log('Async operation has ended');
  //     refresher.complete();
  //   }, 2000);
  // }

  go(){
    this.navCtrl.push(PublishPage);
  }
  FullScreen(i){
    console.log(this.data[i])
    let profileModal = this.modalCtrl.create(DetailPage, { index:i,note:this.data[i] });
   profileModal.present();
  }
  
}

