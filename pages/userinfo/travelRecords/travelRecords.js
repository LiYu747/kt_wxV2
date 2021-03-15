// pages/userinfo/travelRecords/travelRecords.js
import home from '../../../vendor/home/home.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    text: '', //是否还有更多
    lists: [], //出行记录数据
    page: 1,
    ps: 15,
    isLoding: false, //是否显示loding
    hasMore: true, //是否还有更多
    code : 0
  },


  // 获取数据
  loadPageData() {

    if (this.data.isLoding == true || this.data.hasMore == false) return;
    this.setData({
      isLoding: true
    })
    home.travelRecords({
      data: {
        page: this.data.page,
        pageSize: this.data.ps

      },
      fail: () => {
        this.setData({
          isLoding : false
        })
        wx.showToast({
          title: '网络错误',
          icon: 'none'
        })
        // console.log(err);
      },
      success: (res) => {
        this.setData({
          isLoding : false
        })

        if (res.statusCode != 200){
          wx.showToast({
            title: '网络出错了',
            icon: 'none'
          })
          return;
        } 

        if (res.data.code != 200){
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          })
          return;
        } 
        let data = res.data.data;
        data.data.map(item => {
          item.open_gate_at = item.open_gate_at.slice(0, 16)
        })
        let lists = this.data.lists
        lists = lists.concat(data.data)
        this.setData({
          page :  data.current_page + 1,
          hasMore : data.next_page_url ? true : false,
          lists : lists,
          code : res.data.code
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
    this.loadPageData();
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
    this.loadPageData();
    this.setData({
      text : '没有更多了~'
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})