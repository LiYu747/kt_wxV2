// pages/userinfo/userInform/userInform.js
import home from '../../../vendor/home/home.js'
import urlUtil from '../../../vendor/common/url.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 1,
    pageSize: 15,
    isLoding: false, //是否显示loding
    hasMore: true, //是否还有更多
    infoLists: [], //消息列表
    text: '',
    code: 0
  },


  // 全部已读
  ReadAll() {
    if (this.data.infoLists.length == 0) return;
    wx.showLoading({
      title: '加载中'
    })
    home.allRead({
      data: {},
      fail: () => {
        wx.hideLoading()
        wx.showToast({
          title: '网络出错',
          icon: 'none'
        })
      },
      success: (res) => {
        wx.hideLoading()
        if (res.statusCode != 200) {
          wx.showToast({
            title: '网络出问题了',
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
        let infoLists = this.data.infoLists
        infoLists.map(item => {
          item.read_at = '已读'
        })
        this.setData({
          infoLists: infoLists
        })

      }
    })
  },
  // 去详情页面
  goDetails(e) {
    let item = e.currentTarget.dataset.item
    if (!item.read_at) {
      this.Read(item.id)
      let infoLists = this.data.infoLists
      infoLists.map(items => {
        if (items.id == item.id) {
          items.read_at = '已读'
        }
      })
      this.setData({
        infoLists: infoLists
      })
    }
    if (!item.page) return;
    urlUtil.to({
      pageAlias: item.page,
      options: item.params,
    })
  },
  // 消息已读
  Read(id) {
    home.userRead({
      data: {
        id: id
      },
      fail: () => {
        wx.showToast({
          title: '网络出错',
          icon: 'none'
        })
      },
      success: (res) => {
        if (res.statusCode != 200) return;
        if (res.data.code != 200) return;
      }
    })
  },
  // 获取消息通知
  getInform() {
    this.setData({
      isLoding: true
    })
    home.userMessage({
      data: {
        page: this.data.page,
        pageSize: this.data.pageSize
      },
      fail: () => {
        this.setData({
          isLoding: false
        })
        wx.showToast({
          title: '网络出错',
          icon: 'none'
        })
      },
      success: (res) => {
        this.setData({
          isLoding: false
        })
        if (res.statusCode != 200) {
          wx.showToast({
            title: '网络出问题了',
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
          item.created_at = item.created_at.slice(0, 16)
        })
        let infoLists = this.data.infoLists
        infoLists = infoLists.concat(data.data)
        this.setData({
          page: data.current_page + 1,
          hasMore: data.next_page_url ? true : false,
          infoLists: infoLists,
          code: res.data.code
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
    this.getInform()
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
      text: '没有更多了~'
    })
    if (this.data.isLoding == true || this.data.hasMore == false) return;
    this.getInform();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})