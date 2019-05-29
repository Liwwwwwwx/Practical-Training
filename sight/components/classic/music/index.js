// components/classic/music/index.js
import {
  classicBeh
} from '../classic-beh.js'


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

  /**
   * 组件的方法列表
   */
  methods: {
    onPlay: function (event) {
      const bgMusic = wx.getBackgroundAudioManager();
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




  }
})