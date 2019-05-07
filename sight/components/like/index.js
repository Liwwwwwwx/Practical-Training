// compoment/like/like.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    like:Boolean,
    count:Number
  },

  /**
   * 组件的初始数据
   */
  data: {
    likesrc:'images/like.png',
    dislikesrc:'images/like@dis.png'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLike:function(event) {
      let like = this.properties.like
      let count = this.properties.count

      count = like?count-1:count+1
      
      this.setData({
        count:count,
        like:!like
      })
    }
  }
})
