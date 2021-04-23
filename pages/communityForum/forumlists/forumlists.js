// pages/communityForum/forumlists/forumlists.js

import village from '../../../vendor/village/village.js';
import jwt from '../../../vendor/auth/jwt.js'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    sspg: 1,
    sspz: 15,
    sstext: '',
    ssloding: false,
    sshasMore: true,
    lists: [], //搜索数据列表
    page: 1,
    ps: 15,
    isLoding: false,
    hasMore: true,
    value: '', //输入框绑定值
    keyword: '',
    flag: false, //判断有没有搜索结果
    tagdata: [],
    idx: 0, //选择类型
    active: 0
  },


  //自定义
  custom() {
    wx.navigateTo({
      url: '/pages/communityForum/tags/tags',
    })
  },
  //去详情页面
  gotoD(e) {
    let item = e.currentTarget.dataset.item
    wx.navigateTo({
      url: `/pages/communityForum/forum/forum?id=${item.id}`
    })
  },
  // 清空
  empty() {
    this.setData({
      value: '',
      flag: false,
    })
  },
  //取消
  remove() {
    this.setData({
      flag: false,
    })
  },
  //搜索
  serachData() {
    this.setData({
      ssloding: true
    })
    village.communityPost({
      data: {
        villageId: this.data.id,
        tribune_cat: '',
        kw: this.data.value,
        page: this.data.sspg,
        pageSize: this.data.sspz
      },
      fail: () => {
        this.setData({
          ssloding: false
        })
        wx.showToast({
          title: '网络错误',
          icon: 'none'
        })
      },
      success: (res) => {
        this.setData({
          ssloding: false
        })
        if (res.statusCode != 200) return;

        if (res.data.code != 200) return;

        let data = res.data.data;
        data.data.map(item => {
          item.created_at = item.created_at.slice(0, 16)
          item.album = item.album.slice(0, 3)
        })
        this.setData({
          lists: this.data.lists.concat(data.data),
          flag: true,
          sspg :data.current_page + 1,
          sshasMore: data.next_page_url ? true : false
        })
      },

    })
  },
  //获取输入框值
  Onchange(e) {
    if (e.detail.value == '') return;
    this.setData({
      lists : [],
      sspg : 1,
      value: e.detail.value,
      sstext:''
    })
    this.serachData()
  },

  // 选择
  celtags(e) {
    let id = ''
    let index = e.detail.index
    id = this.data.tagdata[index].id
    this.setData({
      idx: index
    })
    if (this.data.tagdata[index].list) return;
    this.loadPageData(id, index)
  },
  // 获取数据
  loadPageData(id, index) {
    village.communityPost({
      data: {
        villageId: this.data.id,
        tribune_cat: id,
        kw: this.data.keyword,
        page: this.data.page,
        pageSize: this.data.ps
      },
      fail: () => {
        wx.showToast({
          title: '网络错误',
          icon: 'none'
        })
      },
      success: (res) => {

        if (res.statusCode != 200) return;

        if (res.data.code != 200) return;
        let data = res.data.data;
        data.data.map(item => {
          item.created_at = item.created_at.slice(0, 16)
          item.album = item.album.slice(0, 3)
        })
        let lists = this.data.tagdata
        lists.map((item, idx) => {
          if (index == idx) {
            item.text = ''
            item.list = data.data
            item.page = data.current_page + 1
            item.hasMore = data.next_page_url ? true : false
          }
        })
        this.setData({
          tagdata: lists,
        })
      },

    })
  },



  //获取默认栏目列表
  grtColumn() {
    village.DefaultColumnList({
      data: {},
      fail: () => {
        wx.showToast({
          title: '网络错误',
          icon: 'none'
        })
      },
      success: (res) => {
        if (res.statusCode != 200) return;
        if (res.data.code != 200) return;

        this.setData({
          tagdata: res.data.data
        })

        this.loadPageData(res.data.data[this.data.idx].id, this.data.idx)
      }
    })
  },

  // 触底事件
  lower() {
    let idx = this.data.idx
    if (this.data.isLoding == true) return;
    if (this.data.tagdata[idx].hasMore == false) {
      let list = this.data.tagdata
      list[idx].text = '没有更多了'
      this.setData({
        tagdata: list
      })
      return;
    }
    this.setData({
      isLoding: true
    })
    village.communityPost({
      data: {
        villageId: this.data.id,
        tribune_cat: this.data.tagdata[idx].id,
        page: this.data.tagdata[idx].page,
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
        data.data.map(item => {
          item.created_at = item.created_at.slice(0, 16)
          item.album = item.album.slice(0, 3)
        })
        let lists = this.data.tagdata
        lists.map((item, index) => {
          if (index == idx) {
            item.list = item.list.concat(data.data)
            item.page = data.current_page + 1
            item.hasMore = data.next_page_url ? true : false
          }
        })
        this.setData({
          tagdata: lists
        })
      },

    })


  },

  // 判断是否登录
  ISuserlogin(){
    jwt.doOnlyTokenValid({
      keepSuccess: false,
      showModal: true,
      fail: () => {
       wx.navigateBack({
         delta: 1,
       })
      },
      success: () => {
       
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (!options.id) return;
    this.setData({
      id: options.id
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.grtColumn()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.ISuserlogin()
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
    app.userIscomment = 0
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
      sstext : '没有更多了'
    })
    if (this.data.ssloding == true || this.data.sshasMore == false) return;
    this.serachData();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})