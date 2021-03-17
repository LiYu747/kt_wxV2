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
    idx: 0,
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
							village.delPost({
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
     // 选择是否可见
			addCel(e) {
        let index = e.currentTarget.dataset.index
        let item = e.currentTarget.dataset.item
        if (this.data.idx == index) return;
        this.setData({
          idx : index
        })
				wx.showLoading({
					title: '加载中'
				})
				village.visiblePost({
					data: {
						id: this.data.id,
						visible: item.value
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
            this.setData({
              seeShow : false
            })
						wx.showToast({
							title: res.data.msg
						})
					}
				})
			},
    // 取消选择
    onSeeClose(){
      this.setData({
        seeShow : false
      })
    },
   //选择可见性
   celShow(){
    this.setData({
      seeShow : true 
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
          this.setData({
            arr : data,
            idx :data.visible
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
    console.log(options)
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