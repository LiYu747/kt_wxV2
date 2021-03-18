// pages/propertyManagement/accessToInformation/accessToInformation.js
import home from '../../../vendor/home/home.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    noText: '',
    page: 1,
    pageSize: 15,
    isLoading: false,
    hasMore: true,
    lists: []
  },

  //获取数据
  getData() {
    this.setData({
      isLoading: true
    })
    home.recordOfAccess({
      data: {
        page: this.data.page,
        pageSize: this.data.pageSize
      },
      fail: () => {
        this.setData({
          isLoading: false
        })
        wx.showToast({
          title: '网络错误',
          icon: "none"
        })
      },
      success: (res) => {
        this.setData({
          isLoading: false
        })
        if (res.statusCode != 200) {
          wx.showToast({
            title: '网络出错了',
            icon: "none"
          })
          return;
        }
        if (res.data.code == 403) {
          wx.showModal({
            content: res.data.msg + '访问',
            success: (res) => {
              wx.navigateBack({
                delta: 1
              })
            }
          })
          return;
        }
        if (res.data.code == 200) {
          let data = res.data.data
          data.data.map(item => {
            item.open_gate_at = item.open_gate_at.slice(0, 16)
            item.created_at = item.created_at.slice(0, 16)
          })
          let lists = this.data.lists
          lists = lists.concat(data.data)
          this.setData({
            lists : lists,
            page :  data.current_page + 1,
            hasMore : data.next_page_url ? true : false
          })
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          })
        }
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
    this.setData({
      noText : '没有更多了'
    })
    if (this.data.isLoding == true || this.data.hasMore == false) return;
    this.getData()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})