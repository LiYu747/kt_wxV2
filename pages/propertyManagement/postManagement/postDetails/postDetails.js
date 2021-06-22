// pages/propertyManagement/postManagement/postDetails/postDetails.js
import home from '../../../../vendor/home/home.js'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    statusCode: 1, //审核状态码
    userInfo: {}, //用户信息
    infomsg: {},
    verifyStatus: '', //是否通过
    value:''
  },

  // 通过
  pass() {
    this.setData({
      verifyStatus: 2
    })
    this.passReq("已通过")
  },
  // 不通过
  nopass() {
    if(!this.data.value){
      wx.showToast({
        title:'请填写不同意的原因告诉用户',
        icon:"none"
      })
      return;
    }
    this.setData({
      verifyStatus: 3
    })
    this.passReq("未通过")
  },
  // 是否通过
  passReq(text) {
    wx.showLoading({
      title: '加载中'
    })
    home.ReviewPosts({
      data: {
        id: this.data.id,
        verify_status: this.data.verifyStatus,
        verify_msg: this.data.value
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
      title: '加载中'
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
        switch (data.verify_status) {
          case 1:
            data.verify_status_text = '待处理'
            break;
          case 2:
            data.verify_status_text = '已通过'
            break;
          case 3:
            data.verify_status_text = '未通过'
            break;
        }
        this.setData({
          statusCode: data.verify_status,
          userInfo: data.own_poster,
          infomsg: data
        })
      }
    })
  },

  //获取输入框的值
  Onchange(e){
         this.setData({
           value : e.detail.value
         })
  },

  //查看图片
  lookImg(e){
    let index = e.currentTarget.dataset.index
    // 预览图片
     wx.previewImage({
       urls:this.data.infomsg.album, 
       current: this.data.infomsg.album[index],
       indicator:"default", 
     }); 
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id
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