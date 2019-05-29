// components/classic/music/index.js
import {
  classicBeh
} from '../classic-beh.js'

const bgMusic = wx.getBackgroundAudioManager();

Component({
  /**
   * 组件的属性列表
   */
  behaviors: [classicBeh],
  properties: {
    src: String,
  },

  /**
   * 组件的初始数据
   */
  data: {
    playing: false,
    pauseSrc: 'images/player@pause.png',
    playSrc: 'images/player@play.png'
  },


  attached(event) {
    this._recoverStatus()
    this._monitorSwitch()
  },
  
  /**
   * 组件的方法列表
   */
  methods: {
    onPlay: function (event) {
      bgMusic.title = this.properties.content
      bgMusic.src = this.properties.src
      if (!this.data.playing) {
        bgMusic.play()
        this.setData({
          playing: true
        })
      } else {
        bgMusic.pause();
        this.setData({
          playing: false
        });
      }

    },

    _recoverStatus:function(){
      if(bgMusic.paused){
        this.setData({
          playing:false
        })
        return 
      }
      if(bgMusic.src == this.properties.src){
        this.setData({
          playing:true
        })
      }
    },

    _monitorSwitch:function(){
      bgMusic.onPlay(()=>{
        this._recoverStatus()
      })
      bgMusic.onPause(() => {
        this._recoverStatus()
      })
      bgMusic.onStop(() => {
        this._recoverStatus()
      })
      bgMusic.onEnded(() => {
        this._recoverStatus()
      })
    }




  }
})