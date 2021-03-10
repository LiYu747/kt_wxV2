// pages/visitapplication/goDetails/goDetails.js
import home from '../../../vendor/home/home.js'
const   QR = require("../../../utils/weapp-qrcode.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: '', //处理结果 
    remark: '', //备注
    result: '', //结果
    redIMG:'', //图片
    locadata: [{
        titel: '姓名',
        value: ''
      },
      {
        titel: '地址',
        value: ''
      },
      {
        titel: '时间',
        value: ''
      }
    ],
    qrcodeURL:'',//二维码
  },
  

  // 获取数据
  loadPageData(id) {
    wx.showLoading({
      title: '加载中...'
    })
    home.goapplydeil({
      data: {
        id: id
      },
      fail: () => {
        wx.hideLoading()
        wx.showToast({
          title: '网络错误',
          icon: 'none'
        })
      },
      success: (res => {
        wx.hideLoading()
        if (res.statusCode != 200) return;

        if (res.data.code != 200) return;
        let data = res.data.data
        // console.log(res.data.data);
        let username = 'locadata[0].value'
        let created = 'locadata[2].value'
        this.setData({
          [username] : data.own_host.username,
          [created] : data.created_at.slice(0, 16),
          username : data.verify_text,
          remark :  data.visitor_remark? data.visitor_remark :'',
          result : data.verify_msg?data.verify_msg:'',
          redIMG : data.ext_img
        })
        if (data.own_village) {
          let name = 'locadata[1].value'
          this.setData({
            [name] : ''  + data.own_village.name + data.own_building.name + data.own_apartment.name + data.own_building.name + data.own_room.room_number
          })
        }
        if(data.qr_content){
          this.drawImg(data.qr_content)
        }
      }),


    })
  },
    // 二维码
 drawImg: function (url){
  let that = this,
      params = url;  // 二维码参数 

  var imgData = QR.drawImg(params, {
      typeNumber: 9,          // 密度
      errorCorrectLevel: 'L', // 纠错等级
      size: 800,              // 白色边框
  })
  
  that.setData({
      qrcodeURL: imgData
  })
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     this.loadPageData(options.id)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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