// pages/residence/seachVill/seachVill.js
import village from '../../../vendor/village/village.js'
	import cache from '../../../vendor/cache/cache.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    code: 0,
    value: '',
    dataList: [],
    historyList: [],
    flag: false,
    forcome: ''
  },
  
	//进入表单页面
  Select(e) {
    let item =  e.currentTarget.dataset.item
    if (this.data.forcome == 1) {
      wx.navigateTo({
        url: '/pages/residence/checkIn/checkIn?id=' + item.id
      })
    }
    if (this.data.forcome == 2) {
      wx.navigateTo({
        url: '/pages/visitapplication/visit/visit?id=' + item.id 
      })
    }

  },

  //搜索
  seachBtn(){
    if (!this.data.value) return;
    wx.showLoading({
      title: '搜索中'
    })
    village.searchVill({
      data: {
        kw: this.data.value,
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
        if (res.data.code != 200) return;
        this.data.historyList.unshift(this.data.value)
        this.data.historyList = this.data.historyList.filter((item, index) => {
          return this.data.historyList.indexOf(item) == index
        })
        cache.set('seachHstry', this.data.historyList)
        this.setData({
          flag : true,
          historyList :this.data.historyList,
          code :  res.data.code,
          dataList : res.data.data
        })
      }
    })
  },

  	//清空
    celnomore() {
      wx.showModal({
        content: '确定清空所以搜索历史',
        success: (res) => {
          if (res.confirm) {
            cache.forget('seachHstry');
            this.setData({
              historyList : []
            })
          } else {
          }
        }
      })

    },
  
	// 取消
  remove() {
    this.setData({
      value : '',
      dataList : [],
      code : 0,
      flag : false
    })
  },

  //获取输入框的值
  Onchange(e){
   this.setData({
    value : e.detail.value
   })
   if (!e.detail.value) {
     this.setData({
      dataList : [],
      code : 0,
      flag : false
     })
  }
  },

  celItem(e) {
    this.setData({
      value : e.currentTarget.dataset.item
    })
    this.seachBtn()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      forcome : options.code
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    if (!cache.get('seachHstry')) return;
    this.setData({
      historyList : cache.get('seachHstry')
    })
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