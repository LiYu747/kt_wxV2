// pages/userMessenger/myInformation/myInformation.js
import home from '../../../vendor/home/home.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    files: [],
    locdata: [{
        label: '申请平台',
        value: ''
      },
      {
        label: '申请编号',
        value: ''
      },
      {
        label: '申请时间',
        value: ''
      },
    ]
  },


  getData() {
    wx.showLoading({
      title: '加载中'
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
        if (res.data.code == 403) {
          wx.showModal({
            content: res.data.msg,
            success: (res) => {
              wx.navigateBack({
                delta: 1
              })
            }
          })
          return;
        }
        if (res.data.code == 200) {
          // console.log(res.data.data);
          let data = res.data.data
          let platform = 'locdata[0].value'
          let code = 'locdata[1].value'
          let created = 'locdata[2].value'
          this.setData({
            [platform]: data.info.platform,
            [code]: data.info.code,
            [created]: data.info.created_at.slice(0, 16),
            files: data.files
          })
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          })
        }

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