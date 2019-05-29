import {
  HTTP
} from '../utils/util'

class ClassicModel extends HTTP {
  getLatest() {
    return this.request({
      url: 'notes',
    })
  }
  getClassic(index, nextOrPrevious) {
    console.log(index, nextOrPrevious)
    return this.request({
      url: 'notes/getnextorpre',
      method: 'POST',
      data: {
        NextOrPre: nextOrPrevious,
        index: index
      },
    })
  }



  isLatest(index) {
    return index == 1 ? true : false
  }

  isFirst(index) {
    let latestIndex = wx.getStorageSync('latest')
    console.log(latestIndex)
    return latestIndex == index ? true : false
  }


  _setLatestIndex() {
    return this.request({
      url:'notes/maxindex'
    })
  }

  _getLatestIndex() {
    this._setLatestIndex().then(res=>{
      console.log(res.data[0].maxindex)
      wx.setStorageSync('latest', res.data[0].maxindex)
    })
  }

}
export {
  ClassicModel
}