// pages/userAddress/userAddress.js
import cache from '../../../../vendor/cache/cache'
import route from '../../../../vendor/request/routes'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    srcss: '', //判断用户是否裁剪图片
    img: '', //图片
    isLoding: false //上传照片
  },
  // 更换照片
  chooseAvatar: function(){
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: res => {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        wx.navigateTo({
          url: '/components/cropper/cropper-example?img=' + tempFilePaths[0],
        })
      }
    })
  },
  goback:function (){
    wx.navigateBack({
      delta: 1,
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
   this.setData({
    img : app.userfaceimg
   })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if(this.data.srcss){
      this.setData({
        isLoding: true
       })
        wx.uploadFile({
          url: route.services.file.upload,
          filePath: this.data.srcss,
          name: 'file',
          complete: (res) => {
            this.setData({
              isLoding: false
             })
            if (res.statusCode != 200) {
              wx.showToast({
                title: '网络请求出错',
                icon: 'none'
              });
              return;
            }
            let data = JSON.parse(res.data)
            if (data.code != 200) {
              wx.showToast({
                title: data.msg,
                icon: 'none'
              });
              return;
            }
            wx.showToast({
              title: '上传成功',
              icon: 'none'
            })
            this.setData({
              img : data.data.url
            })
            app.userfaceimg = data.data.url
          }
        });
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
     this.setData({
       srcss : ''
     })
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