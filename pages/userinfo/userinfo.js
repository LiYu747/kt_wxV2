// pages/userinfo/userinfo.js
import userDetails from '../../vendor/user/userDetails.js';
import jwt from '../../vendor/auth/jwt.js';
import home from '../../vendor/home/home'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user: null, //用户资料
    text: '未登录',
    flag: false,
    informmsg:0,
    locdata:[
		  {image:'https://oss.kuaitongkeji.com/static/img/app/user/Checkin.png',
		  titel:'入驻申请',
		  url:'/pages/residence/checkRecord/checkRecord'
		  },
		  {image:'https://oss.kuaitongkeji.com/static/img/app/user/visit.png',
		   titel:'拜访申请',
		   url:'/pages/visitapplication/goRecord/goRecord'
		  },
		  {image:'https://oss.kuaitongkeji.com/static/img/app/user/record.png',
		   titel:'来访记录',
		   	url:'/pages/operation/visitRecord/visitRecord'
		  },
		  {image:'https://oss.kuaitongkeji.com/static/img/app/user/scan.png',
		   titel:'回家二维码',
		   	url:'/pages/qrcode/qrcode'
		  },
		  {image:'https://oss.kuaitongkeji.com/static/img/app/user/Trecords.png',
		   titel:'出行记录',
		   url:'/pages/userinfo/travelRecords/travelRecords'
		  },
		  {image:'https://oss.kuaitongkeji.com/static/img/app/address/msgtz.png', 
		   titel:'消息通知',
		   url:'/pages/userinfo/userInform/userInform' 
		  },
		  {image:'https://oss.kuaitongkeji.com/static/img/app/user/about.png', 
		   titel:'关于快通',
		   url:'/pages/user/versionNumber/versionNumber'
		  },
	  ]
  },   

  	// 点击每一栏事件
    add(e) {
      let item = e.currentTarget.dataset.item
      if (!item.url) return;
      wx.navigateTo({
        url: item.url
      })
    },
    	//用户基本信息
			userinfo() {
				wx.navigateTo({
					url: '/pages/userinfo/personal/personal'
				})
			},
  	// 去设置
    install() {
      wx.navigateTo({
        url: '/pages/userinfo/realInformation/realInformation'
      })
    },

     // 获取消息通知数量
			getInform() {
				home.unread({
					data: {},
					fail: () => {
						wx.showToast({
							title: '网络出错',
							icon: 'none'
						})
					},
					success: (res) => {
						if (res.statusCode != 200) return
						if (res.data.code != 200) return
            let data = res.data.data
            this.setData({
              informmsg : data.total_unread
            })
						// console.log(data);
					}
				})
			},

  	// 获取用户资料 
    getUser() {
      userDetails.userDeta({
        data: {},
        fail: () => {
          wx.showToast({
            title: '网络错误',
            icon: 'none'
          })
        },
        success: (res) => {
          this.setData({
            user : res.data.data
          })
        },
      })
    },
    // 判断用户是否登录
			loadUserData() {
				jwt.doOnlyTokenValid({
					showModal: true,
					keepSuccess: false,
					success: () => {},
					fail: () => {
						wx.switchTab({
							url: '/pages/index/index'
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

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getUser()
    this.loadUserData()
    this.getInform()
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
  // onShareAppMessage: function () {

  // }
})