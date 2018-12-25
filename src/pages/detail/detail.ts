import { Component } from "@angular/core";
import { NavController, NavParams, Events } from "ionic-angular";
import { HttpClient } from "@angular/common/http";
import { Storage } from "@ionic/storage";
import { CommentPage } from "../comment/comment";
import { CollectPage } from "../collect/collect";
/**
 * Generated class for the DetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//@IonicPage()
@Component({
  selector: "page-detail",
  templateUrl: "detail.html"
})
export class DetailPage {
  //文章数据
  item;
  index;
  //文章内容换行
  contentdetail;

  //点赞数量
  clickCount = 0;

  //文章图片
  imgs = "";
  notecontent = "note-content";

  //是否点赞
  isClick;
  priIsClick;
  srcdis = "assets/imgs/like@dis.png";
  srclike = "../../assets/imgs/like.png";

  //收藏
  isCol;
  priIsCol;
  discolsrc = "assets/imgs/shoucang@dis.png";
  colsrc = "assets/imgs/shoucang.png";

  //音乐播放
  isPlaying = false;
  playsrc = "assets/imgs/player@play.png";
  displaysrc = "assets/imgs/player@pause.png";
  player = "player";
  displayer = "displayer";
  rotation = "";
  audio: HTMLAudioElement;
  //用户名
  username = "";
  constructor(
    public events:Events,
    public params: NavParams,
    public http: HttpClient,
    public storage: Storage,
    public navCtrl: NavController
  ) {
    console.log(params.data.note);
    this.item = params.data.note;
    this.index = params.data.index;
    this.contentdetail = params.data.note.notecontent.replace(
      /(\r\n)|(\n)/g,
      "<br/>"
    );
    if (this.item.notemusic && this.item.noteimg) {
      this.imgs = "imgsplay";
      this.notecontent = "note_content";
    } else if (this.item.noteimg) {
      this.imgs = "imgs";
      this.notecontent = "note_content";
    }
  }
  ngOnInit() {
    this.http
      .post("/notedata/clickcount", { noteid: this.item.noteid })
      .subscribe(data => {
        if (data[0] !== undefined) this.clickCount = data[0].clickCount;
      });
      
    var that = this;
    function getName() {
      return new Promise(resolve => {
        that.storage.get("USER_INFO").then(value => {
          that.username = JSON.parse(value).username;
          resolve(that.username);
        });
      });
    }
    function isClick() {
      that.http
        .post("/notedata/isclick", {
          noteid: that.item.noteid,
          name: that.username
        })
        .subscribe(result => {
          console.log(result);
          that.isClick = result[0].count ? true : false;
          that.priIsClick = result[0].count ? true : false;
        });
    }
    function isCollection() {
      that.http
        .post("/notedata/isCollection", {
          noteid: that.item.noteid,
          name: that.username
        })
        .subscribe(result => {
          console.log(result);
          that.isCol = result[0].count ? true : false;
          that.priIsCol = result[0].count ? true : false;
        });
    }
    var p = new Promise(resolve => {
      resolve();
    });
    p.then(getName).then(isClick).then(isCollection);
  }
  ionViewDidLoad() {
    console.log("ionViewDidLoad DetailPage");
  }
  close() {
    console.log(this.priIsClick, this.isClick);
    console.log(this.priIsCol, this.isCol);
    if (this.priIsClick == false && this.isClick == true) {
      this.Click();
    }
    if (this.priIsClick == true && this.isClick == false) {
      this.disClick();
    }
    if (this.priIsCol == false && this.isCol == true) {
      this.Collection();
    }
    if (this.priIsCol == true && this.isCol == false) {
      this.disCollection();
    }
    
    this.navCtrl.pop().then(()=>{
      this.events.publish('ReloadMyCollection');
    });
  }
  like() {
    this.clickCount = this.isClick ? this.clickCount - 1 : this.clickCount + 1;
    this.isClick = !this.isClick;
  }
  collection(){
    this.item.collectionCount = this.isCol ? this.item.collectionCount - 1 : this.item.collectionCount + 1;
    this.isCol = !this.isCol;
  }
  play() {
    this.audio = document.querySelector("#audios");
    this.rotation = this.isPlaying ? "" : "rotation";
    this.isPlaying ? this.audio.pause() : this.audio.play();
    this.isPlaying = !this.isPlaying;
  }

  goComment() {
    this.navCtrl.push(CommentPage,this.item.noteid);
  }
  goCollect() {
    this.navCtrl.push(CollectPage);
  }
  disClick() {
    this.http
      .post("/notedata/disclick", {
        noteid: this.item.noteid,
        name: this.username
      })
      .subscribe(result => {
        console.log(result);
      });
  }
  Click() {
    this.http
      .post("/notedata/click", {
        noteid: this.item.noteid,
        name: this.username
      })
      .subscribe(result => {
        console.log(result);
      });
  }
  disCollection(){
    this.http
      .post("/notedata/disCollection", {
        noteid: this.item.noteid,
        name: this.username
      })
      .subscribe(result => {
        console.log(result);
      });
  }
  Collection(){
    this.http
      .post("/notedata/Collection", {
        noteid: this.item.noteid,
        name: this.username
      })
      .subscribe(result => {
        console.log(result);
      });
  }
  
  
}
