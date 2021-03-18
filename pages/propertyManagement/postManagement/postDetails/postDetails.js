// pages/propertyManagement/postManagement/postDetails/postDetails.js
import home from '../../../../vendor/home/home.js'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
  	id: '',
				statusCode:1,//审核状态码
				userInfo: {}, //用户信息
				infomsg: {},
				verifyStatus:'',//是否通过
  },
   
     	// 通过
			pass(){
        this.setData({
          verifyStatus : 1
        })
        this.passReq("通过审核")
        },
        // 不通过
        nopass(){
          this.setData({
            verifyStatus : 2
          })
          this.passReq("未通过审核")
        },
  	// 是否通过
    passReq(text){
      wx.showLoading({
        title:'加载中'
      })
      home.ReviewPosts({
        data:{
          id:this.data.id,
          verify_status:this.data.verifyStatus
        },
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
          if (res.data.code != 200) {
            wx.showToast({
              title: res.data.msg,
              icon: "none"
            })
            return;
          }
          wx.showToast({
            title: res.data.msg
          })
          const time = setTimeout(() => {
            this.getData()
            app.IsPostpass = text
            clearTimeout(time)
          }, 1500)
        }
      })
    },
  // 获取数据
  getData() {
    wx.showLoading({
      title:'加载中'
    })
    home.postDetails({
      data: {
        id: this.data.id
      },
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
        if (res.data.code != 200) {
          wx.showToast({
            title: res.data.msg,
            icon: "none"
          })
          return;
        }
        let data = res.data.data
        this.setData({
          statusCode :  data.verify_status,
          userInfo : data.own_user,
          infomsg : data
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id : options.id
    })
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