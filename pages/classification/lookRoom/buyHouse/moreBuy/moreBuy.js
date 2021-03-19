// pages/classification/lookRoom/buyHouse/moreBuy/moreBuy.js
import home from '../../../../../vendor/home/home.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    rentingRoom: [],
    keyword: [{
      name: '区域'
    }, {
      name: '房型'
    }, {
      name: '价格'
    }, {
      name: '更多'
    }],
    page: 1,
    pageSize: 15,
    hasMore: true,
    isLoding: false,
    text: '',
  },
  
  // 去详情
  gotoDetails(e) {
     let item = e.currentTarget.dataset.item
    wx.navigateTo({
      url: '/pages/classification/lookRoom/buyHouse/buyDetails/buyDetails?id=' + item.id
    })
  },
  // 所有出售房信息
  getSell() {
    this.setData({
      isLoding : true
    })
    home.sellRecords({
      data: {
        page: this.data.page,
        pageSize: this.data.pageSize
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
      success: (res) => {
        this.setData({
          isLoding : false
        })
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
        let data = res.data.data
        data.data.map(item => {
          if (item.zx == 'low') {
            item.zx = '清水房'
          }
          if (item.zx == 'simple') {
            item.zx = '简装'
          }
          if (item.zx == 'well') {
            item.zx = '精装'
          }
          let bathroom = item.bathroom != null ? item.bathroom + '卫' : "";
          let hall = item.hall != null ? item.hall + '厅' : '';
          item.brief = item.room + '室' + hall + bathroom
        })
        let lists = this.data.rentingRoom
        lists = lists.concat(data.data)
        this.setData({
          rentingRoom : lists,
          page :  data.current_page + 1,
          hasMore : data.next_page_url ? true : false
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
   this.getSell()
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
      text : '没有更多了'
    })
    if (this.data.isLoding == true || this.data.hasMore == false) return;
    this.getSell()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})