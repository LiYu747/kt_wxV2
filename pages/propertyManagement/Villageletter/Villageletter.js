// pages/propertyManagement/Villageletter/Villageletter.js
import home from "../../../vendor/home/home.js"
import jwt from '../../../vendor/auth/jwt.js'
import cache from '../../../vendor/cache/cache.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    code:0,
    list: [], //轮播图
    villinfo: {}, //小区展示信息
    isLoding: false,
  },
	// 小区展示信息
  Information() {
    this.isLoding = true
    home.getVillageinfo({
      data: {
        
      },
      fail: () => {
        this.isLoding = false
        wx.showToast({ 
          title: '网络错误',
          icon: 'none'
        })
      },
      success: (res) => {
        this.isLoding = false
        if (res.statusCode != 200) return
        if(res.data.code == 403){
          wx.showModal({
            content:res.data.msg,
            success: () => {
              wx.navigateBack({
                delta:1
              })
            }
          })
          return;
        }
        if (res.data.code != 200){
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          })
          return;
        } 
        let data = res.data.data
       let img = ['https://oss.kuaitongkeji.com/upload/2020/12/15/AY0xTVMZBzNuJ0acHphXphi4gewrdyJeuBoypUCH.jpeg']
        this.setData({
          code : res.data.code,
          list : !data.album  || data.album.length == 0  ? img :data.album,
          villinfo : data
        })
      }
    })
  },

    //查看图片
    lookImg(e){
      let index = e.currentTarget.dataset.index
      // 预览图片
       wx.previewImage({
         urls:this.data.list, 
         current: this.data.list[index],
         indicator:"default", 
       }); 
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
    this.Information()
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