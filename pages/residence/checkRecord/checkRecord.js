// pages/residence/checkRecord/checkRecord.js
import home from '../../../vendor/home/home.js'
import cache from '../../../vendor/cache/cache.js'
import user from '../../../vendor/user/userDetails.js'
import jwt from '../../../vendor/auth/jwt.js'
import urlUtil from '../../../vendor/common/url.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: '', //真实姓名
    text: '',
    lists: [],
    page: 1,
    ps: 15,
    isLoding: false, //是否显示loding
    hasMore: true, //是否还有更多
    notext:''
  },

	// 去详情
  godetails(e) {
     let item = e.currentTarget.dataset.item
    wx.navigateTo({
      url: `/pages/residence/checkdetails/checkdetails?id=${item.id}`
    })
  },

   // 获取数据
   loadPageData() {
     this.setData({
       isLoding: true
     })
    home.applerecord({
      data: {
        page: this.data.page,
        pageSize: this.data.ps

      },
      fail: () => {
        this.setData({
          isLoding: false
        })
        wx.showToast({
          title: '网络错误',
          icon: 'none'
        })
      },
      success: (res) => {
        this.setData({
          isLoding: false
        })

        if (res.statusCode != 200) return;

        if (res.data.code != 200) return;

        let data = res.data.data;
        if(data.data.length == 0){
          this.setData({
            notext : '您还没有申请记录哦~'
          })
          return
        }
        data.data.map(item => {
          if (item.verify_status == 1) {
            item.verify_status_text = '审核中'
          }
          item.created_at = item.created_at.slice(0,16)
        })
        var lists = this.data.lists
        lists = lists.concat(data.data)
        this.setData({
          page : data.current_page + 1,
          hasMore : data.next_page_url ? true : false,
          lists : lists
        })
        
      },

    })
   },
   	// 获取用户资料
     Userdata() {
      user.userDeta({
        data: {},
        fail: () => {
          wx.showToast({
            title: '网络出错了',
            icon:'none'
          })
        },
        success: (res) => {
          if (res.statusCode != 200) return;
          if (res.data.code != 200) return;
          let Users = res.data.data
          this.setData({
            username : Users.username
          })
        },
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
   this.loadPageData()
   this.Userdata()
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
    this.setData({
      text : '没有更多了~'
    })
    if (this.data.isLoding == true || this.data.hasMore == false) return;
    this.loadPageData();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})