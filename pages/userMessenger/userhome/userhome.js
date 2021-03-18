// pages/userMessenger/userhome/userhome.js
import home from '../../../vendor/home/home.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userType: [{
      name: '用户',
      type: 'user',
      url: '/pages/index/index'
    },
    {
      name: '物业',
      type: 'property',
      url: '/pages/propertyManagement/propertyhome/propertyhome'
    },
    {
      name: '快递、外卖',
      type: 'expressage',
      url: '/pages/userMessenger/userhome/userhome',
    }
  ],
  isShowType: false,
  code:'403'
  },
   
  // 申请成为
  ApplyingTo() {
    wx.navigateTo({
      url: '/pages/userMessenger/applyingTo/applyingTo'
    })
  },
  // 路线导航
  navigation(){
    wx.navigateTo({
      url: '/pages/classification/travel/travel'
    })
  },
 	// 我的信息
   myInfo(){
    wx.navigateTo({
      url:'/pages/userMessenger/myInformation/myInformation'
    })
  },
	// 拜访申请
  VisitToApply() {
    wx.navigateTo({
      url: '/pages/visitapplication/visit/visit?text=您好,我这边是外卖快递,请您通过一下 '
    })
  },
  	// 通行二维码
    passQrCode() {
      wx.navigateTo({
        url: '/pages/userMessenger/goQrCode/goQrCode'
      })
    },
  // 获取信息
  getData() {
    wx.showLoading({
      title:'加载中'
    })
    home.lookMymsg({
      data: {},
      fail: () => {
        wx.hideLoading()
              wx.showToast({
                title: '网络错误',
                icon: "none"
              })
      },
      success: (res) => {
        wx.hideLoading()
        if (res.statusCode != 200) {
          wx.showToast({
            title: '网络出错了',
            icon: "none"
          })
          return;
        }
        if(res.data.code != 200 && res.data.code != 403){
          wx.showToast({
            title: res.data.msg,
            icon: "none"
          })
          return;
        }
        this.setData({
          // code : res.data.code
        })
      }
    })
  },
  // 确定用户选择
  selecType(e) {
    let item = e.currentTarget.dataset.item
    if (item.type == 'expressage') return;
    wx.reLaunch({
      url: item.url
    })
  },
  // 打开用户选择
  celShow(){
   this.setData({
    isShowType : !this.data.isShowType
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
   this.getData()
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
   this.setData({
    isShowType : false
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