// pages/homeSearch/search.js
import village from '../../vendor/village/village.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: '', //搜索过来的关键词
    page:1,
    hasMore: true,
    locdata:[],
    isLoding: false,
    text:''
  },
  //  去详情页面
  gotoo(e){
    let id = e.currentTarget.dataset.item.id
    wx.navigateTo({
      url: '/pages/communityForum/introduction/introduction?id=' + id,
    })
  },

  // 搜索数据
  getData() {
    this.setData({
      isLoding : true
    })
    village.allvillage({
      data: {
        page: this.data.page,
        kw: this.data.value
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
        if (res.statusCode != 200) return;

        if (res.data.code != 200) return;

        let data = res.data.data
        this.setData({
          page :data.current_page + 1,
          hasMore:data.next_page_url ? true : false,
          locdata:this.data.locdata.concat(data.data)
        })
      }
    })
  },
  // 搜索
  confirm() {
    this.setData({
      page:1,
      locdata:[]
    })
    this.getData()
  },
  inputchange(val){
     this.setData({
       value:val.detail.value
     })
  },
  // 返回
  remove(){
     wx.navigateBack({
       delta:1
     })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     this.setData({
       value : options.text
     })
     this.getData()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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
      text:'没有更多了'
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