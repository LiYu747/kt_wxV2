// pages/visitapplication/newDetalis/newDetalis.js
	import home from '../../../vendor/home/home.js'
  import jwt from '../../../vendor/auth/jwt.js'
  const   QR = require("../../../utils/weapp-qrcode.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    getmsg: {},
				username: '', //处理结果
				remark: '', //备注
				result: '', //结果
				redIMG:'',//图片
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
        isLoding:false,
        qrcodeURL:'',//二维码
        notInfo:false
  },
  
	// 添加
  addTo() {
    wx.navigateTo({
      url: '/pages/visitapplication/visit/visit'
    })
  },
  // 获取数据
  loadPageData() {
    jwt.doOnlyTokenValid({
      showModal: true,
      keepSuccess: false,
      success: () => {
        this.setData({
          isLoding : true
        })
        home.newapply({
          data: {
          },
          fail: () => {
            this.setData({
              isLoding : false
            })
            wx.showToast({
              title: '网络错误',
              icon: 'none'
            })
          },
          success: (res => {
            this.setData({
              isLoding : false
            })
            if (res.statusCode != 200) return;

            if (res.data.code != 200) return;
            let data = res.data.data
            if (!data){
              this.setData({
                notInfo : true
              })
              return;
            }
            else{
              this.setData({
                notInfo : false
              })
            } 
            this.drawImg(data.qr.content)
            let name = ''
            if (data.info.verify_status == 2) {
              name = '已同意'
            } else if (data.info.verify_status == 3) {
              name = '未同意'
            } else {
              name = '已过期'
            }
            let username = 'locadata[0].value'
            let created_at = 'locadata[2].value'
            this.setData({
              username : name,
              getmsg :  res.data.data,
              [username]:data.info.own_host.username,
              [created_at] : data.info.created_at.slice(0, 16),
              remark : data.info.visitor_remark? data.info.visitor_remark:'',
              result : data.info.verify_msg?data.info.verify_msg:'' ,
              redIMG : data.info.ext_img ,
            })
            if(data.info.own_village){
              let value = 'locadata[1].value'
              this.setData({
                [value] : '' + data.info.own_village.name + data.info.own_building.name + data.info.own_apartment.name + data.info.own_building
                .name + data.info.own_room.room_number
              })
            }
          }),
        })
      },
      fail: () => {
        this.setData({
          isLoding : false
        })
         wx.switchTab({
          url: '/pages/index/index'
        })
      }
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
    this.loadPageData()
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