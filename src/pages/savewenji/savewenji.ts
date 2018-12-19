import { Component } from "@angular/core";
import { NavController, NavParams, ModalController, ToastController, Events } from "ionic-angular";
import { NewPage } from "../new/new";
import { Storage } from "@ionic/storage";
import { HttpClient } from "@angular/common/http";
/**
 * Generated class for the SavewenjiPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//@IonicPage()
@Component({
  selector: "page-savewenji",
  templateUrl: "savewenji.html"
})
export class SavewenjiPage {
  username;
  data;
  selectValue;
  
  constructor(
    public http: HttpClient,
    public storage: Storage,
    public modalCtrl: ModalController,
    public navCtrl: NavController,
    public params: NavParams,
    public toastCtrl: ToastController,
    public events: Events
  ) {}
  datas = this.params.data;
  ionViewDidLoad() {
    console.log(this.datas);
    this.events.subscribe('reloadNotePage', () => {
      this.username = this.datas.username;
      this.http
      .post("/notedata/anthologydetail", { name: this.username })
      .subscribe(result => {
        console.log(result);
        this.data = result;
        console.log('刷新后的数据：',this.data);
      });
    });
  }
  ngOnInit() {
    // 获取文集
    this.username = this.datas.username;
    console.log(this.username);
    this.http
      .post("/notedata/anthologydetail", { name: this.username })
      .subscribe(result => {
        console.log(result);
        this.data = result;
        console.log(this.data);
      });
  }

  // 传入数据库
  transferDetails() {
    if(!this.selectValue) {
      this.showToast('middle','请选择文集!');
      return ;
    }
    console.log(this.datas);
    this.http.post('/notedata/newPhoto',this.datas).subscribe(result => {
      console.log(result);
    });
    // 返回根目录并刷新
    this.navCtrl.popToRoot().then(()=>{
      this.events.publish('reloadNotePage');
    });
  }

  goNew() {
    this.navCtrl.push(NewPage, { username: this.username });
  }

  langSelect() {
    this.datas.anthologyname = this.selectValue;
    console.log("langSelect: " + this.selectValue);
    console.log('datas:',this.datas);
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
