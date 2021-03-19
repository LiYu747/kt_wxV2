// pages/classification/lookRoom/buyHouse/buyDetails/buyDetails.js
import home from '../../../../../vendor/home/home.js'
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
      title: '售价',
      value: ''
    }, {
      title: '房型',
      value: ''
    }, {
      title: '建筑面积',
      value: ''
    }],
    roomInof: {},
  },

  //拨打电话
  consult(){
    if(!this.data.roomInof.tel) return;
    wx.makePhoneCall({
        phoneNumber:  this.data.roomInof.tel
    });
  },
  // 地址
  Address(){
    if(!this.data.roomInof.lat) return;
    if(!this.data.roomInof.lgt) return;
    let latitude = Number(this.data.roomInof.lat)
    let longitude = Number(this.data.roomInof.lgt)
    wx.openLocation({
        latitude: latitude,
        longitude: longitude, 
        success: function () {
            console.log('success');
        }
    });
  },
  getData(id) {
    wx.showLoading({
      title: "加载中"
    })
    home.sellDetails({
      data: {
        id: id
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
        let bathroom = data.bathroom != null ? data.bathroom + '卫' : "";
        let hall = data.hall != null ? data.hall + '厅' : '';
     
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
        let price = 'locdata[0].value'
        let room = 'locdata[1].value'
        let area = 'locdata[2].value'
        this.setData({
          [price] : data.sale_price + '万',
          [room] : data.room + '室' + hall + bathroom,
          [area] : data.area + '㎡',
          roomInof : data
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   this.getData(options.id)
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