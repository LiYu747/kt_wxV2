// pages/communityForum/mypostdeta/mypostdeta.js
import village from '../../../vendor/village/village.js'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: "",
    arr: {}, //数据
    user: {},
    seeList: [{
        value: '0',
        label: ' 仅自己可见',
        ref: 'https://oss.kuaitongkeji.com/static/img/app/forum/uplock.png'
      }, {
        value: '1',
        label: ' 所有人可见',
        ref: 'https://oss.kuaitongkeji.com/static/img/app/forum/lock.png'
      },

    ],
    seeShow: false,
  },
    
      // 删除
			delt() {
				wx.showModal({
					content: '您确定要删除该条帖子吗',
					success: (res) => {
						if (res.confirm) {
							wx.showLoading({
								title: '加载中'
							})
							village.deluserpost({
								data: {
									id: this.data.id
								},
								fail: () => {
									wx.hideLoading()
									wx.showToast({
										title: '网络错误',
										icon: 'none'
									})
								},
								success: (res) => {
									wx.hideLoading()
									if (res.statusCode != 200) {
										wx.showToast({
											title: '网络出错了',
											icon: 'none'
										})
										return;
									}
									if (res.data.code != 200) {
										wx.showToast({
											title: res.data.msg,
											icon: 'none'
										})
										return;
                  }
                  app.myPostisDel = res.data.code
									wx.navigateBack({
										delta:1
                  })
                  
								}
							})
						}
					}
				})
			},
    
  // 详情数据 
  getData() {
    wx.showLoading({
      title:'加载中'
    })
    village.MypostDeta({
      data: {
        id: this.data.id
      },
      fail: () => {
        wx.hideLoading()
        wx.showToast({
          title: '网络错误',
          icon: 'none'
        })
      },
      success: (res) => {
        wx.hideLoading()
        // console.log(res.data.data);
        if (res.statusCode != 200) return
        if(res.data.code != 200 ){
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 2000
          })
          return
        } 
          let data = res.data.data
          data.created_at = data.created_at.slice(0, 16)
          switch(data.verify_status){
            case 1:
            data.verify_status = "待审核"
            break;
            case 2:
            data.verify_status = "已通过"
            break;
            case 3:
            data.verify_status = "未通过"
            break;
          }
          this.setData({
            arr : data,
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