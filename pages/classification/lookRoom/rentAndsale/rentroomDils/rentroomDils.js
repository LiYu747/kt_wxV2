// pages/classification/lookRoom/rentAndsale/rentroomDils/rentroomDils.js
import home from '../../../../../vendor/home/home.js'
	import cache from '../../../../../vendor/cache/cache.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    indicatorDots: false,
    autoplay: false,
    interval: 2000,
    duration: 500,
    locdata: [{
      title: '面积',
      value: ''
    }, {
      title: '楼层',
      value: ''
    }, {
      title: '户型',
      value: ''
    }],
    roomInof: {},
    id:''
  },


   	// 去设置
     install(){
      wx.navigateTo({
        url:'/pages/classification/lookRoom/rentAndsale/setRent/setRent?id=' + this.data.id 
      })
    },
    //拨打电话
			consult() {
				if(!this.data.roomInof.tel) return;
				wx.makePhoneCall({
				 phoneNumber: this.data.roomInof.tel
				});
			},
  	// 地址
    Address(){
      let latitude = Number(this.data.roomInof.lat)
      let longitude = Number(this.data.roomInof.lng)
      wx.openLocation({
          latitude: latitude,
          longitude: longitude, 
          success: function () {
              console.log('success');
          }
      });
    },
   //数据
   getData() {
    wx.showLoading({
      title:"加载中"
    })
    home.rentDils({
      data: {
        id: this.data.id
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
        if (res.statusCode != 200) {
          wx.showToast({
            title: '网络出错了',
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
        if (data.album && data.album.length > 1) {
          this.setData({
            indicatorDots : true
          })
        }
        if (data.album == [] || !data.album) {
          let album = ['https://oss.kuaitongkeji.com/upload/2021/02/20/Kztg485iqwsrKNrDLXKIeQ7apbhuyi4v1SHpslOv.jpeg']
          data.album = album
        }
        if (data.zx == 'low') {
          data.zx = '清水房'
        }
        if (data.zx == 'simple') {
          data.zx = '简装'
        }
        if (data.zx == 'well') {
          data.zx = '精装'
        }
        if (data.ele == 0) {
          data.ele = '无'
        }
        if (data.ele == 1) {
          data.ele = '有'
        }
        let bathroom = data.bathroom != null ? data.bathroom + '卫' : "";
        let hall = data.hall != null ? data.hall + '厅' : '';
        let area = 'locdata[0].value'
        let floor = 'locdata[1].value'
        let room = 'locdata[2].value'
        this.setData({
          [area] : data.area + '㎡',
          [floor] : data.floor + '/' + data.total_floor + '层',
          [room] : data.room + '室' + hall + bathroom,
          roomInof : data
        })
        cache.set('isShow',data.is_show)
      }
    })
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})