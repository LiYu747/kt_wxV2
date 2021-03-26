// pages/communityForum/tags/tags.js
import village from '../../../vendor/village/village.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    getData:[]
  },


  getCustomLists() {
    village.customLists({
      data: {},
      fail: () => {
        uni.showToast({
          title: '网络出错',
          icon: 'none'
        })
      },
      success: (res) => {
        if (res.statusCode != 200) return;
        if (res.data.code !== 200) return;
        res.data.data.tribune_cat.map((item, index) => {
          let r = parseInt(Math.random() * 256)
          let g = parseInt(Math.random() * 256)
          let b = parseInt(Math.random() * 256)
          let bgColor = `rgba(${r},${g},${b},0.3)`
          item.background =  bgColor
        })
        this.setData({
          getData : res.data.data.tribune_cat
        })

      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
   this.getCustomLists()
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