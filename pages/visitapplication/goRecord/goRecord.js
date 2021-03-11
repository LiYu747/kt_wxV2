// pages/visitapplication/goRecord/goRecord.js
import home from '../../../vendor/home/home.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lists: [], //申请记录数据
    text: '', //是否还有更多
    page: 1, //页数
    ps: 15,
    isLoding: false, //是否显示loding
    hasMore: true, //是否还有更多
    notInfo:false
  },
  
	// 去详情
  godetails(e) {
    let item = e.currentTarget.dataset.item
    wx.navigateTo({
      url: `/pages/visitapplication/goDetails/goDetails?id=${item.id}`
    })
  },
  // 获取数据
  getData(){
    this.setData({
      isLoding : true
    })
    home.gorecord({
      data: {
        page: this.data.page,
          pageSize:this.data.ps
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
      
        let data = res.data.data;
        if(data.data.length == 0){
          this.setData({
            notInfo : true
          })
          return;
        }
        // console.log(data);
        let lists = this.data.lists
        lists = lists.concat(data.data)
        this.setData({
          page :  data.current_page + 1,
          hasMore :  data.next_page_url ? true : false,
          lists : lists
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
      text : '没有更多了~'
    })
    if (this.data.isLoding == true || this.data.hasMore == false) return;
    this.getData();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})