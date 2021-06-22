// pages/index/peripheryMore/peripheryMore.js
import home from '../../../vendor/home/home.js'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    locdata: [],
    page: 1,
    pageSize: 15,
    flag: 0,
    isLoding: false,
    hasMore: true,
    text:'',		
  },

  // 去详情页面
  godils(e) {
    home.surroundingDetails({
      data: {
        id: e.currentTarget.dataset.item.id
      },
      fail: () => {
        uni.showToast({
          title: '网络错误',
          icon: 'none'
        })
      },
      success: (res) => {
        if (res.statusCode != 200) return
        if (res.data.code != 200) return
        // console.log(res.data.data);
        let content = {
          title: res.data.data.title,
          content: res.data.data.content
        }
        app.redInfo = content
        this.newsRead(res.data.data.id)
        wx.navigateTo({
          url: '/pages/InformationDetails/InformationDetails'
        })
      }
    })
  },

  	//阅读统计
    newsRead(id){
      home.newsRead({
        data:{id:id},
        fail: () => {
          wx.showToast({
            title: '网络错误',
            icon: 'none'
          })
        },
        success: (res) => {
          if (res.statusCode != 200) return
          if (res.data.code != 200) return
          // console.log(res.data.data.data);
        },
      })
    },
    
// 数据
getData() {
  if(this.data.isLoding == true || this.data.hasMore == false) return;
  this.setData({
    isLoding : true  
  })
  home.news({
    data: {
      page: this.data.page,
      pageSize: this.data.pageSize
    },
    fail: () => {
      wx.showToast({
        title: '网络错误',
        icon: 'none'
      })
      this.setData({
        isLoding : false
      })
    },
    success: (res) => {
      this.setData({
        isLoding : false
      })
      if (res.statusCode != 200) return
      if (res.data.code != 200) return
      // console.log(res.data.data.data);
      let data = res.data.data
      data.data.map(item => {
        item.created_at = item.created_at.slice(0, 10)
      })
      this.setData({
        page : data.current_page + 1,
        hasMore : data.next_page_url ? true : false,
        locdata : this.data.locdata.concat(data.data) 
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
    this.getData()
    this.text = "到底啦!"
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})