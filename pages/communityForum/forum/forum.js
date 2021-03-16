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
    src: '', //查看图片路径
    see: false, //图片遮罩层
    page: 1,
    pageSize:15,
    isLoding: false,
    hasMore: true,
    text: '',

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   this.setData({
     id : options.id
   })
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})