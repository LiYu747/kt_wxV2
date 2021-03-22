// pages/classification/lookRoom/lookRoom.js
import home from '../../../vendor/home/home.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    rentingRoom: [],
    sellRoom: [],
    notext: '',
    notext2: ''
  },


  //我要卖房
  mySellers() {
    wx.navigateTo({
      url: '/pages/classification/lookRoom/sellersForm/sellersForm'
    })
  },
  // 我要出租
  myRental() {
    wx.navigateTo({
      url: '/pages/classification/lookRoom/rentalForm/rentalForm'
    })
  },
  // 去租房详情
  gotoDetails(e) {
    let item = e.currentTarget.dataset.item
    wx.navigateTo({
      url: '/pages/classification/lookRoom/rentRoom/detailRoom/detailRoom?id=' + item.id
    })
  },
  //去买房详情
  gotoBuy(e) {
    let item = e.currentTarget.dataset.item
    wx.navigateTo({
      url: '/pages/classification/lookRoom/buyHouse/buyDetails/buyDetails?id=' + item.id
    })
  },
  //更多买房
  moreBuye() {
    wx.navigateTo({
      url: '/pages/classification/lookRoom/buyHouse/moreBuy/moreBuy'
    })
  },
  // 更多租房
  addmore() {
    wx.navigateTo({
      url: '/pages/classification/lookRoom/rentRoom/moreRoom/moreRoom'
    })
  },
  // 所有的出租房信息
  getRoom() {
    home.allRoom({
      data: {
        page: 1,
        pageSize: 3
      },
      fail: () => {
        wx.showToast({
          title: '网络错误',
          icon: 'none'
        })
      },
      success: (res) => {
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
        let data = res.data.data.data
        data.map(item => {
          let hall = item.hall != null ? item.hall + '厅' : '';
          item.introduce = item.room + '室' + hall
        })
        if (data.length == 0) {
          this.setData({
            notext: '还没有人发布租房信息'
          })
        }
        this.setData({
          rentingRoom: data
        })
      }
    })
  },
  // 所有出售房信息
  getSell() {
    home.sellRecords({
      data: {
        page: 1,
        pageSize: 3
      },
      fail: () => {
        wx.showToast({
          title: '网络错误',
          icon: 'none'
        })
      },
      success: (res) => {
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
        let data = res.data.data.data
        data.map(item => {
          let hall = item.hall != null ? item.hall + '厅' : '';
          item.introduce = item.room + '室' + hall
        })
        if (data.length == 0) {
          this.setData({
            notext2: '还没有人发布卖房信息'
          })
        }
        this.setData({
          sellRoom: data
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
    this.getRoom()
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})