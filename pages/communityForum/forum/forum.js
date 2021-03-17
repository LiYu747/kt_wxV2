// pages/communityForum/forum/forum.js
import village from '../../../vendor/village/village.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: "",
    arr: {}, //数据
    user: {},
    comments: [], //获取评论
    flag: false,
    context: '',
    page: 1,
    pageSize: 15,
    isLoding: false,
    hasMore: true,
    text: '',
  },


  //获取输入文本
  Onchange(e) {
    this.setData({
      context: e.detail.value
    })
  },
  // 发送评论
  send() {
    wx.showLoading({
      title: '发送中'
    })
    village.relComments({
      data: {
        tribune_id: this.data.id,
        content: this.data.context
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
        if (res.statusCode != 200) return;
        if (res.data.code != 200) {
          wx.showToast({
            title: res.data.msg,
            duration: 2000,
            icon: 'none'
          })
        }
        this.setData({
          page: 1,
          context: '',
          comments: [],
        })
        this.loadPageData()
        wx.showToast({
          title: res.data.msg,
          duration: 2000
        })
      }
    })
  },
  // 打开评论
  open() {
    this.setData({
      flag: !this.data.flag
    })
  },
  // 评论获取数据
  loadPageData() {
    this.setData({
      isLoding: true
    })
    village.postComments({
      data: {
        tribune_id: this.data.id,
        page: this.data.page,
        pageSize: this.data.pageSize
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
        data.data.map(item => {
          item.created_at = item.created_at.slice(0, 16)
        })
        let lists = this.data.comments
        lists = lists.concat(data.data)
        this.setData({
          hasMore: data.next_page_url ? true : false,
          page: data.current_page + 1,
          comments: lists
        })
      },
    })
  },
  // 详情数据 
  getData() {
    this.setData({
      isLoding: true
    })
    village.postDetails({
      data: {
        id: this.data.id
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
        // console.log(res.data.data);
        if (res.statusCode != 200) return
        if (res.data.code != 200) {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 2000
          })
          return;
        }
        let data = res.data.data
        data.created_at = data.created_at.slice(0, 16)
        this.setData({
          arr: data,
          user: data.own_user
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getData()
    this.loadPageData()
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
      text: '没有更多了'
    })
    if (this.data.isLoding == true || this.data.hasMore == false) return;
    this.loadPageData()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})