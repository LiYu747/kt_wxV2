// pages/classification/travel/travel.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    longitude : '',
    latitude : ''
  },
   

  // 开始导航
  start(){
    this.userPos()
  },
  userPos(){
    let key = 'V24BZ-ZZSCI-A6RGT-5MBOB-EQLJH-NPB6T';  //使用在腾讯位置服务申请的key
    let referer = '快通信息';   //调用插件的app的名称
       
    let endPoint = JSON.stringify({  //终点
      'name': this.data.goPosition,
      'latitude': this.data.golat,
      'longitude': this.data.golng
    });
    wx.navigateTo({
      url: 'plugin://routePlan/index?key=' + key + '&referer=' + referer + '&endPoint=' + endPoint   + '&navigation=1'
    });
  },

  //获取当前位置
  getLoca(){
    let that = this
    wx.showLoading({
      title: '加载中',
    })
    wx.getLocation({
      type: 'gcj02',
      altitude:true,
      isHighAccuracy : true,
      fail () {
        wx.hideLoading()
        wx.showToast({
          title: '网络出错',
        })
      },
      success (res) {
        wx.hideLoading()
        that.setData({
          latitude : res.latitude,
          longitude :  res.longitude
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
   this.getLoca()
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