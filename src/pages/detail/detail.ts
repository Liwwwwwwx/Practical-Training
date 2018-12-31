import { Component } from "@angular/core";
import { NavController, NavParams, Events } from "ionic-angular";
import { HttpClient } from "@angular/common/http";
import { Storage } from "@ionic/storage";
import { CommentPage } from "../comment/comment";
import { OtheruserPage } from "../otheruser/otheruser";
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
  noteid: number;
  item;
  datas = {};
  index: any;
  //文章内容换行
  contentdetail: any;

  //点赞数量
  clickCount = 0;
  commentCount = 0;
  collectionCount = 0;
  //文章图片
  imgs = "";
  notecontent = "note-content";

  //是否点赞
  isClick: boolean;
  priIsClick: boolean;
  srcdis = "assets/imgs/like@dis.png";
  srclike = "../../assets/imgs/like.png";

  //收藏
  isCol: boolean;
  priIsCol: boolean;
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
    public events: Events,
    public params: NavParams,
    public http: HttpClient,
    public storage: Storage,
    public navCtrl: NavController
  ) {
    this.index = params.data.index;

    this.noteid = params.data.noteid;
  }
  ngOnInit() {
    //文章详情
    this.http
      .post("/notedata/notedetail", { noteid: this.noteid })
      .subscribe(data => {
        this.item = data;
        this.contentdetail = this.item[0].notecontent.replace(
          /(\r\n)|(\n)/g,
          "<br/>"
        );
        if (this.item[0].notemusic && this.item[0].noteimg) {
          this.imgs = "imgsplay";
          this.notecontent = "note_content";
        } else if (this.item[0].noteimg) {
          this.imgs = "imgs";
          this.notecontent = "note_content";
        }
        console.log(data);
      });
    //点赞数量
    this.http
      .post("/notedata/clickcount", { noteid: this.noteid })
      .subscribe(data => {
        if (data[0] !== undefined) this.clickCount = data[0].clickCount;
      });
    //收藏数量
    this.http
      .post("/notedata/collectionCount", { noteid: this.noteid })
      .subscribe(data => {
        if (data[0] !== undefined)
          this.collectionCount = data[0].CollectionCount;
        console.log(this.collectionCount);
      });
    //评论数量
    this.http
      .post("/notedata/commentCount", { noteid: this.noteid })
      .subscribe(data => {
        if (data[0] !== undefined) this.commentCount = data[0].commentCount;
        console.log(this.commentCount);
      });
    //评论后，评论数+1
    this.events.subscribe("CommentCount", () => {
      this.commentCount = this.commentCount + 1;
    });
  }
  ionViewDidLoad() {
    var that = this;
    //获取用户名
    function getName() {
      return new Promise(resolve => {
        that.storage.get("USER_INFO").then(value => {
          that.username = JSON.parse(value).username;
          resolve(that.username);
        });
      });
    }
    //是否点赞
    function isClick() {
      that.http
        .post("/notedata/isclick", {
          noteid: that.noteid,
          name: that.username
        })
        .subscribe(result => {
          console.log(result);
          that.isClick = result[0].count ? true : false;
          that.priIsClick = result[0].count ? true : false;
        });
    }
    //是否收藏
    function isCollection() {
      that.http
        .post("/notedata/isCollection", {
          noteid: that.noteid,
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
    p.then(getName)
      .then(isClick)
      .then(isCollection);
    console.log("ionViewDidLoad DetailPage");
  }

  //离开页面
  close() {
    console.log(this.priIsClick, this.isClick);
    console.log(this.priIsCol, this.isCol);

    //判断是否点赞
    if (this.priIsClick == false && this.isClick == true) {
      this.Click();
    }
    if (this.priIsClick == true && this.isClick == false) {
      this.disClick();
    }

    //判断是否收藏
    if (this.priIsCol == false && this.isCol == true) {
      this.Collection();
      //对应首页收藏数量+1
      this.events.publish("reloadCollectionCount", this.index, this.isCol);
    }
    if (this.priIsCol == true && this.isCol == false) {
      this.disCollection();
      //对应首页收藏数量-1
      this.events.publish("ReloadMyCollection");
      this.events.publish("reloadCollectionCount", this.index, this.isCol);
    }
    //重新加载我的收藏内容
    this.navCtrl.pop();
  }

  //点赞数量加减
  like() {
    this.clickCount = this.isClick ? this.clickCount - 1 : this.clickCount + 1;
    this.isClick = !this.isClick;
  }

  //跳转他人资料页面
  goother() {
    this.navCtrl.push(OtheruserPage, {
      username: this.item[0].username
    });
  }

  //收藏数量加减
  collection() {
    this.collectionCount = this.isCol
      ? this.collectionCount - 1
      : this.collectionCount + 1;
    this.isCol = !this.isCol;
  }

  //控制音乐播放
  play() {
    this.audio = document.querySelector("#audios");
    this.rotation = this.isPlaying ? "" : "rotation";
    this.isPlaying ? this.audio.pause() : this.audio.play();
    this.isPlaying = !this.isPlaying;
  }

  //跳转评论页面
  goComment() {
    this.navCtrl.push(CommentPage, {
      noteid: this.noteid,
      commentCount: this.commentCount,
      index: this.index
    });
  }

  //取消点赞
  disClick() {
    this.http
      .post("/notedata/disclick", {
        noteid: this.noteid,
        name: this.username
      })
      .subscribe(result => {
        console.log(result);
      });
  }
  
  //点赞
  Click() {
    this.http
      .post("/notedata/click", {
        noteid: this.noteid,
        name: this.username
      })
      .subscribe(result => {
        console.log(result);
      });
  }

  //取消收藏
  disCollection() {
    this.http
      .post("/notedata/disCollection", {
        noteid: this.noteid,
        name: this.username
      })
      .subscribe(result => {
        console.log(result);
      });
  }

  //收藏
  Collection() {
    this.http
      .post("/notedata/Collection", {
        noteid: this.noteid,
        name: this.username
      })
      .subscribe(result => {
        console.log(result);
      });
  }
}
