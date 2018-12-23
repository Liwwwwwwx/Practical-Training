import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { PublishPage } from '../publish/publish';
import { SavewenjiPage } from '../savewenji/savewenji';
import $ from 'jquery';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the PmusicPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//@IonicPage()
@Component({
  selector: 'page-pmusic',
  templateUrl: 'pmusic.html',
})
export class PmusicPage {
  isOriginal: boolean = false;
  isPrivate: boolean = false;
  content: string = '';
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient, public storage: Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PmusicPage');
  }
  goPublish(){
    this.navCtrl.push(PublishPage);
  }
  openPhoto() {
    document.getElementById('photo_upload').click();
  }
  // 显示图片
  showPhoto(e) {
    console.log($('#photo_upload')[0].value);
    if(! $('#photo_upload')[0].value) {
      return ;
    }
    //获取目标文件
    var file = e.target.files || e.dataTransfer.files;
    //如果目标文件存在
    if (file) {
    //定义一个文件阅读器
    var reader = new FileReader();
    //文件装载后将其显示在图片预览里
    reader.onload = function () {
    $("#showImg").attr("src", this.result);
    }
    //装载文件
    reader.readAsDataURL(file[0]);
    }
  }
  openMusic() {
    document.getElementById('music_upload').click();
  }
  // 显示文件名
  showMusic(e) {
    var file = $("#music_upload").val();
    var fileName = getFileName(file);

    function getFileName(o){
        var pos=o.lastIndexOf("\\");
        return o.substring(pos+1);  
    }
    console.log(fileName);
    $('#showAudio').html(fileName);
  }
  
  // 下一步
  go(){
    var datas = {};
    // 上传图片
    function uploadPhotoByForm() {
      //用form 表单直接 构造formData 对象; 就不需要下面的append 方法来为表单进行赋值了。
      return new Promise((resolve) => {
        var formData = new FormData($("#photoForm")[0]);
        console.log(formData);
        that.http.post('/upload',formData).subscribe(result => {
          // console.log(JSON.stringify(result));
          // console.log(JSON.stringify(result).match(/http\S+.(jpg|png)/)[0]);
          Object.assign(datas,result);
          console.log(datas);
          resolve(datas);
        });
      });
    }
    // 上传音乐
    function uploadMusicByForm(datas) {
      //用form 表单直接 构造formData 对象; 就不需要下面的append 方法来为表单进行赋值了。
      return new Promise((resolve) => {
        var formData = new FormData($("#musicForm")[0]);
        console.log(formData);
        that.http.post('/uploadMP3',formData).subscribe(result => {
          Object.assign(datas,result);
          console.log(datas);
          resolve(datas);
        });
      });
      
    }
    // 获取用户名
    var that = this;
    function getName(datas) {
      return new Promise((resolve) => {
        that.storage.get('USER_INFO').then((value) =>{
          console.log(value);
          console.log(JSON.parse(value));
          datas.username = JSON.parse(value).username;
          console.log('storage:', that.storage);
          resolve(datas);
        });
      });
    }
    // 获取文字内容
    function getDetails(datas) {
      console.log(datas.username);
      console.log(that.content);
      datas.isOriginal = that.isOriginal;
      datas.isPrivate = that.isPrivate;
      datas.notecategory = '音乐';
      datas.content = that.content;
      console.log('datas:', datas);
      that.navCtrl.push(SavewenjiPage,datas);
    }

    var p = new Promise((resolve) => {

      resolve();
    });
    p.then(uploadPhotoByForm).then(uploadMusicByForm).then(getName).then(getDetails).catch(reason => {console.log(reason);});
  }
}
