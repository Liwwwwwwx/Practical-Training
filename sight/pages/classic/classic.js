// pages/classic/classic.js
import { ClassicModel } from '../../models/classic.js'
// import { LikeModel } from '../../models/like.js'
let classicModel = new ClassicModel()
// let likeModel = new LikeModel()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    classic:[],
    latest: true,
    first: false,
    likeCount: 0,
    likeStatus: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const getLatest = classicModel.getLatest()
    getLatest.then(res => {
      console.log(res)
      this.setData({
        classic:res.data[0]
      })
    })
      
  },

  // onLike: function (event) {
  //   // console.log(event)
  //   const behavior = event.detail.behavior
  //   likeModel.like(behavior, this.data.classic.id, this.data.classic.type)
  // },
  onNext: function (event) {
    this._updateClassic('next');
  },

  onPrevious: function (event) {
    this._updateClassic('previous')
  },

  _updateClassic: function (nextOrPrevious) {
    const index = this.data.classic.index
    const getClassic = classicModel.getClassic(index,nextOrPrevious);
    getClassic.then(res=>{
      console.log(res.data[0])
      this.setData({
        classic:res.data[0],
        latest: classicModel.isLatest(res.data[0].index),
        first: classicModel.isFirst(res.data[0].index)
      })
    })
  },
  // _getLikeStatus: function (artID, category) {
  //   likeModel.getClassicLikeStatus(artID, category, (res) => {
  //     this.setData({
  //       likeCount: res.fav_nums,
  //       likeStatus: res.like_status
  //     })
  //   })
  // },






  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})