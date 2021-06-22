// pages/classification/lookRoom/rentAndsale/rentAndsale.js
import home from '../../../../vendor/home/home.js'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    til: [{
      name: '我的出租',
    }, {
      name: '我的卖房',
    }],
    scrollTop: 0,
    lists: [], //我发布的租房
    page: 1,
    pageSize: 15,
    text: '',
    isLoding: false, //是否显示loding
    hasMore: true, //是否还有更多
    data1: [], //我参与的
    page1: 1,
    pageSize1: 15,
    text1: '',
    isLoding1: false, //是否显示loding
    hasMore1: true, //是否还有更多
    clientX: '',
    index1: '', //租房看的哪一项
    index2: '', //售房看的哪一项
    idx: 0,//从哪类去的
    triggered:false,
    triggered1:false
  },
  
   
  	// 去详情
    gotoD(e) {
      let item = e.currentTarget.dataset.item
      let index = e.currentTarget.dataset.index
      this.setData({
        index1 : index,
        idx : 0
      })
      wx.navigateTo({
      url: '/pages/classification/lookRoom/rentAndsale/rentroomDils/rentroomDils?id=' + item.id
      })
    },
    // 去卖房详情
    reply(e) {
      let item = e.currentTarget.dataset.item
      let index = e.currentTarget.dataset.index
      this.setData({
        index2 : index,
        idx : 1
      })
      wx.navigateTo({
      url: '/pages/classification/lookRoom/rentAndsale/saleroomDils/saleroomDils?id=' + item.id
      })
    },
  // 租房信息
  loadPageData() {
    this.setData({
      isLoding: true
    })
    home.postrentMsg({
      data: {
        page: this.data.page,
        pageSize: this.data.pageSize
      },
      fail: () => {
        this.setData({
          isLoding: false,
          triggered : false
        })
        wx.showToast({
          title: '网络错误',
          icon: 'none'
        })
      },
      success: (res) => {
        this.setData({
          isLoding: false,
          triggered : false
        })

        if (res.statusCode != 200) return;

        if (res.data.code != 200) return;

        let data = res.data.data;
        data.data.map(item => {
          item.introduce = item.room + '室' + item.hall + '厅' + item.bathroom + '卫'
          if (item.zx == 'low') {
            item.zx = '清水房'
          }
          if (item.zx == 'simple') {
            item.zx = '简装'
          }
          if (item.zx == 'well') {
            item.zx = '精装'
          }
        })
        let lists = this.data.lists
        lists = lists.concat(data.data)
        this.setData({
          lists : lists,
          page : data.current_page + 1,
          hasMore : data.next_page_url ? true : false
        })
      },

    })

  },
  // 卖房信息
  SelfPost() {
    this.setData({
      isLoding1 : true
    })
    home.postsellMsg({
      data: {
        page: this.data.page1,
        pageSize: this.data.pageSize1
      },
      fail: () => {
        this.setData({
          isLoding1 : false,
          triggered1 : false
        })
        wx.showToast({
          title: '网络错误',
          icon: 'none'
        })
      },
      success: (res) => {
        this.setData({
          isLoding1 : false,
          triggered1 : false
        })

        if (res.statusCode != 200) return;

        if (res.data.code != 200) return;
        let data = res.data.data;
        data.data.map(item => {
          item.introduce = item.room + '室' + item.hall + '厅' + item.bathroom + '卫'
          if (item.zx == 'low') {
          item.zx = '清水房'
          }
          if (item.zx == 'simple') {
          item.zx = '简装'
          }
          if (item.zx == 'well') {
          item.zx = '精装'
          }
        }) 
        let lists = this.data.data1
        lists = lists.concat(data.data)
        this.setData({
          data1 : lists,
          page1 :  data.current_page + 1,
          hasMore1 : data.next_page_url ? true : false
        })

      },

    })

  },
  	// 下拉加载更多
    onreachBottom1(e) {
      this.setData({
        text : '没有更多了'
      })
      if (this.data.isLoding == true || this.data.hasMore == false) return;
      this.loadPageData()
    },
    // 下拉加载更多
    onreachBottom2(e) {
      this.setData({
        text1 : '没有更多了'
      })
      if (this.data.isLoding1 == true || this.data.hasMore1 == false) return;
      this.SelfPost()
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
   this.SelfPost()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if(app.roomIsDel != 200) return;
     if(this.data.idx == 0){
      this.data.lists.splice(this.data.index1,1)
      this.setData({
        lists :  this.data.lists,
        text:''
      })
     }
     if(this.data.idx == 1){
      this.data.data1.splice(this.data.index2,1)
      this.setData({
        data1 :  this.data.data1,
        text1:''
      })
     }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    app.roomIsDel = 0
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