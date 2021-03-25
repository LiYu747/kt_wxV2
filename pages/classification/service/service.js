// pages/classification/service/service.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    till: ['全部', '家电维修', '水管维修', '电脑维修'],
    idx: 0,
    getData: [],
    locadata: [{
        image: 'https://oss.kuaitongkeji.com/static/img/app/classification/service/logo1.png',
        name: '邻家维修（华阳店）',
        score: '4.9',
        Price: '￥183/人',
        distance: '5.9km',
        Views: '12597人浏览',
        titel: ' 家电维修  ',
        address: ' 天府新区  ',
        tag: [
          'https://oss.kuaitongkeji.com/static/img/app/classification/service/1.png',
          'https://oss.kuaitongkeji.com/static/img/app/classification/service/2.png',
          'https://oss.kuaitongkeji.com/static/img/app/classification/service/3.png',
        ]
      },
      {
        image: 'https://oss.kuaitongkeji.com/static/img/app/classification/service/logo2.png',
        name: '速达到家家电维修（华阳店）',
        score: '5.0',
        Price: '暂无均价',
        distance: '6.1km',
        Views: '12541人浏览',
        titel: ' 家电维修',
        address: ' 天府新区 ',
        tag: [
          'https://oss.kuaitongkeji.com/static/img/app/classification/service/2.png',
          'https://oss.kuaitongkeji.com/static/img/app/classification/service/5.png',
        ]
      },
      {
        image: 'https://oss.kuaitongkeji.com/static/img/app/classification/service/logo3.png',
        name: '驰瑞电脑手机维修',
        score: '4.8',
        Price: '暂无均价',
        distance: '3.9km',
        Views: '12541人浏览',
        titel: ' 电脑维修',
        address: ' 天府新区 ',
        tag: [
          'https://oss.kuaitongkeji.com/static/img/app/classification/service/6.png',
          'https://oss.kuaitongkeji.com/static/img/app/classification/service/2.png',
        ]
      },
      {
        image: 'https://oss.kuaitongkeji.com/static/img/app/classification/service/logo4.png',
        name: '芯维修手机上门维修（天府三街店）',
        score: '5.0',
        Price: '暂无均价',
        distance: '8.0km',
        Views: '12589人浏览',
        titel: ' 电脑维修 ',
        address: ' 天府新区 ',
        tag: [
          'https://oss.kuaitongkeji.com/static/img/app/classification/service/3.png',
          'https://oss.kuaitongkeji.com/static/img/app/classification/service/2.png',
        ]
      }
    ],
    locadata1: [{
      image: 'https://oss.kuaitongkeji.com/static/img/app/classification/service/logo2.png',
      name: '速达到家家电维修（华阳店）',
      score: '5.0',
      Price: '暂无均价',
      distance: '6.1km',
      Views: '12541人浏览',
      titel: ' 家电维修',
      address: ' 天府新区 ',
      tag: [
        'https://oss.kuaitongkeji.com/static/img/app/classification/service/2.png',
        'https://oss.kuaitongkeji.com/static/img/app/classification/service/5.png',
      ]
    }, ],
    locadata2: [{
      image: 'https://oss.kuaitongkeji.com/static/img/app/classification/service/logo1.png',
      name: '邻家维修（华阳店）',
      score: '4.9',
      Price: '￥183/人',
      distance: '5.9km',
      Views: '12597人浏览',
      titel: ' 家电维修  ',
      address: ' 天府新区  ',
      tag: [
        'https://oss.kuaitongkeji.com/static/img/app/classification/service/1.png',
        'https://oss.kuaitongkeji.com/static/img/app/classification/service/2.png',
        'https://oss.kuaitongkeji.com/static/img/app/classification/service/3.png',
      ]
    }, ],
    locadata3: [{
      image: 'https://oss.kuaitongkeji.com/static/img/app/classification/service/logo3.png',
      name: '驰瑞电脑手机维修',
      score: '4.8',
      Price: '暂无均价',
      distance: '3.9km',
      Views: '12541人浏览',
      titel: ' 电脑维修',
      address: ' 天府新区 ',
      tag: [
        'https://oss.kuaitongkeji.com/static/img/app/classification/service/6.png',
        'https://oss.kuaitongkeji.com/static/img/app/classification/service/2.png',
      ]
    }, ]
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
  

  add(e) {
    let index = e.currentTarget.dataset.index
    let arr = []
    if (index == 0) {
      arr = this.data.locadata
    }
    if (index == 1) {
      arr = this.data.locadata1
    }
    if (index == 2) {
      arr = this.data.locadata2
    }
    if (index == 3) {
      arr = this.data.locadata3
    }
    this.setData({
      getData : arr,
      idx : index
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      getData : this.data.locadata
    })
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