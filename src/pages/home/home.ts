import { Component } from "@angular/core";
import { ModalController, NavController, Events, ToastController } from "ionic-angular";
import { Storage } from "@ionic/storage";
import { PublishPage } from "../publish/publish";
import { DetailPage } from "../detail/detail";
import { HttpClient } from "@angular/common/http";
import { LoginPage } from "../login/login";

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  data;
  textcontent;
  username;
  password;
  image = "image";
  note_content = "note_content";
  notecontent = "note-content";
  constructor(
    public storage: Storage,
    public http: HttpClient,
    public modalCtrl: ModalController,
    public navCtrl: NavController,
    public events: Events,
    public toastCtrl: ToastController
  ) {}
  isClick: Boolean = false;
  ngOnInit() {
    var that = this;
    // 获取用户名和密码
    function getLocalDetail() {
      return new Promise(resolve => {
        that.storage.ready().then(() => {
          that.storage.get('USER_INFO').then( value => {
            that.username = !!value ? JSON.parse(value).username : '';
            that.password = !!value ? JSON.parse(value).password : '';
            console.log(that.username, that.password);
            resolve();
          });
        });
      });
    }
    // 验证用户名是否存在
    function checkName() {
      return new Promise((resolve) => {
        that.http.post('/signup/name',{username: that.username}).subscribe(result => {
          if(!result) {
            that.showToast('bottom','登陆失败，请重新登录！');
            that.modalCtrl.create(LoginPage).present();
          } else {
            console.log('用户名验证通过');
            resolve();
          }
        });
      });
    }
    // 验证是否正确
    function checkMatch() {
      return new Promise(resolve => {
        that.http.post('/login/login', {name: that.username, psw: that.password}).subscribe(data => {
          console.log(data);
          if( !data) {
            that.showToast('bottom','密码错误，请重新登录！');
            // 界面跳转
            that.modalCtrl.create(LoginPage).present();
          } else {
            console.log('登陆成功');
            resolve();
          }
        });
      });
    }
    // 获取首页信息
    function getNote() {
      that.http.get("/notedata").subscribe(data => {
        console.log(data);
        that.data = data;
        that.textcontent = that.data.map(function(item) {
          return item.notecontent.replace(/(\r\n)|(\n)/g, "<br/>");
        });
      });
    }
    // Promise
    var p = new Promise((resolve) => {
      resolve();
    });
    p.then(getLocalDetail).then(checkName).then(checkMatch).then(getNote).catch(reason => {console.log(reason);});
    // Events事件
    this.events.subscribe("reloadNotePage", () => {
      this.http.get("/notedata").subscribe(data => {
        this.data = data;
        this.textcontent = this.data.map(function(item) {
          return item.notecontent.replace(/(\r\n)|(\n)/g, "<br/>");
        });
      });
    });
    this.events.subscribe("reloadCollectionCount", (index,isCol) => {
      this.data[index].collectionCount = isCol?this.data[index].collectionCount +1:this.data[index].collectionCount - 1;
    });
    this.events.subscribe("ChangeCommentCount", (index) => {
      this.data[index].commentCount = this.data[index].commentCount + 1;
    });
  }

  go() {
    this.navCtrl.push(PublishPage);
  }
  FullScreen(i) {
    console.log(this.data[i]);
    let profileModal = this.modalCtrl.create(DetailPage, {
      index: i,
      noteid:this.data[i].noteid,
    });
    profileModal.present();
  }
  // 提示信息
  showToast(position: string, message: string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: position
    });
    toast.present(toast);
  }
}
