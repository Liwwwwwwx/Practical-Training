import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PublishPage } from '../publish/publish';
// import { SavewenjiPage } from '../savewenji/savewenji';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import $ from 'jquery';
import { SavewenjiPage } from '../savewenji/savewenji';
/**
 * Generated class for the PphotoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pphoto',
  templateUrl: 'pphoto.html',
})
export class PphotoPage {
  
  isOriginal: boolean = false;
  isPrivate: boolean = false;
  content: string = '';
  // datas = {
  //   username: '',
  //   content: '',
  //   anthologyname: '',
  //   notecategory: '',
  //   isOriginal: false,
  //   isPrivate: false
  // };

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient, public storage: Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PphotoPage');
  }
  goPublish(){
    this.navCtrl.push(PublishPage);
  }
  // 点击执行上传文件事件
  openForm() {
    $('#file_upload').click();
  }
  // 显示图片
  showPhoto(e) {
    console.log($('#file_upload')[0].value);
    if(! $('#file_upload')[0].value) {
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

  // 下一步
  go(){
    var datas;
    // 上传图片
    function uploadByForm() {
      //用form 表单直接 构造formData 对象; 就不需要下面的append 方法来为表单进行赋值了。
      return new Promise((resolve) => {
        var formData = new FormData($("#myForm")[0]);
        console.log(formData);
        that.http.post('/upload',formData).subscribe(result => {
          datas = result;
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
      datas.notecategory = '图片';
      datas.content = that.content;
      console.log('datas:', datas);
      that.navCtrl.push(SavewenjiPage,datas);
    }
    

    // 传入数据库
    // function transferDetails(datas) {
    //   // datas.anthologyname = '默认文集';
    //   console.log(datas);
    //   var formData = new FormData($("#myForm")[0]);
    //   console.log(formData);
    //   datas.formData = formData;
    //   that.http.post('/notedata/newPhoto',datas).subscribe(result => {
    //     console.log(result);
    //   });
    // }

    var p = new Promise((resolve) => {
      resolve();
    });
    p.then(uploadByForm).then(getName).then(getDetails).catch(reason => {console.log(reason);});
  }

}
