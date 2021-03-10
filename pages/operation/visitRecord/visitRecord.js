// pages/operation/visitRecord/visitRecord.js
import home from '../../../vendor/home/home.js';
import jwt from '../../../vendor/auth/jwt.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    text: '',  //没有有更多提示
    lists: [],  //数据列表
    page: 1,
    ps: 15,
    isLoding: false,  //是否显示loding
    hasMore: true, //是否还有更多
    notInfo: false
  },
  
  // 去详情
  godetails(e) {
    let item = e.currentTarget.dataset.item
    wx.navigateTo({
      url: `/pages/operation/details/details?id=${item.id}`
    })
  },
  // 获取数据
  loadPageData() {
    jwt.doOnlyTokenValid({
      keepSuccess: false,
      showModal: true,
      fail: () => {
        uni.switchTab({
          url: '/pages/index/index'
        })
      },
      success: () => {
        this.setData({
          isLoding : true
         })
        home.Visitrecord({
          data: {
            page: this.data.page,
            pageSize: this.data.ps
          },
          fail: () => {
            this.setData({
              isLoding : false
             })
            uni.showToast({
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

            let data = res.data.data;
            if(data.data.length == 0) {
              this.setData({
                notInfo : true
              })
              return;
            }
            data.data.map(item => {
              item.own_visitor.tel = item.own_visitor.tel.slice(0,3) + '****' +item.own_visitor.tel.slice(7,11)
              item.created_at = item.created_at.slice(0,16)
            })
            let lists = this.data.lists
            lists = lists.concat(data.data)
            this.setData({
              page :  data.current_page + 1,
              hasMore : data.next_page_url ? true : false,
              lists : lists
            })
            // console.log(this.lists);
          },
          
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

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      lists : [],
      page : 1
    })
    this.loadPageData()
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
      text : '没有更多了~'
    })
		if (this.data.isLoding == true || this.data.hasMore == false) return;
			this.loadPageData();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})