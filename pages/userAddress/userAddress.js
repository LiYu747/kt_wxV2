// pages/userAddress/userAddress.js
import jwt from '../../vendor/auth/jwt.js'
import address from '../../vendor/address/address.js'
import cache from '../../vendor/cache/cache'
//  import cache from '../../vendor/cache/cache.js'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    code:0,
    rotateTimes: 1,
    pushshow: true, //是否显示添加入住申请
    message: true,//显示电梯提示
    flagss: false,
		msg: '', //电梯提示类容
    locdata: [], //数据列表
    isLoding: false,
    showPullDownRefreshIcon: false,
    Gshow: 0,
    flag:false,
    navBarHeight: app.globalData.navBarHeight + 140,
  },
  // 编辑
  look(e) {
    let item = e.currentTarget.dataset.item
    wx.navigateTo({
      url: `/pages/userAddress/addediting/ADDediting?id=${item.id}`
    })
  },
  
  //联系物业
  callTenement(){
    wx.navigateTo({
      url: '/pages/userAddress/tenement/tenement',
    })
  },

  move(){

  },
  gotohome() {
    if(this.data.Gshow == 5){
      let num = this.data.Gshow+1
      cache.set('Gshow',{key:'步骤'+ num,value: num})
    }
    wx.switchTab({
      url: '/pages/index/index'
    })
  },
  // 添加地址
  getto() {
    if(this.data.Gshow == 2){
      let num = this.data.Gshow+1
      cache.set('Gshow',{key:'步骤'+ num,value: num})
      wx.redirectTo({
        url: '/pages/residence/seachVill/seachVill?code=1'
      })
      return;
    }
    wx.navigateTo({
      url: '/pages/residence/seachVill/seachVill?code=1'
    })
  },
  //预约电梯
  order(e) {
    this.setData({
      message : true,
      msg : '预约成功',
      flagss : true
      })
      return;
    let id = e.currentTarget.dataset.item.id
    wx.showLoading({
      title:'预约中...'
    })
    address.bookingElevator({
      data: {
        id: id,
        toFloor: 1
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
        if (res.data.code == 200) {
          this.setData({
          message : true,
          msg : res.data.msg,
          flagss : true
          })
        } else {
          this.setData({
            message : false,
            msg : res.data.msg,
            flagss : true
            })
        }
     
      }
    })
  },
   //知道了
   sure () {
     this.setData({
      flagss : false
     })
   },
  //进入论坛
  Select(e) {
    let val = e.currentTarget.dataset
    wx.navigateTo({
      url: '/pages/communityForum/introduction/introduction?id=' + val.item.village_id,
    })
  },
   
  // 用户所有地址
   userAlladd(){
    this.setData({
      isLoding: true
    })
    address.alladd({
      data: {
      },
      fail: () => {
        this.setData({
          isLoding: false
        })
        this.stopRefreshIcon();
        wx.showToast({
          title: '网络错误',
          icon: 'none'
        })
      },
      success: (res) => {
        this.stopRefreshIcon();
        this.setData({
          isLoding: false
        })
        if (res.statusCode != 200) return;
        if (res.data.code != 200) return;
        let data = res.data.data;
        data.map(item => {
          if (item.own_village) {
            item.address = item.own_village.name + item.own_building.name + item.own_apartment.name + item.own_floor.name + item.own_room.name
          }
        })
          this.setData({
            code:res.data.code,
            locdata: data
          })
      }
    })
   },
  //判断是否登录
  loadPageData() {
    jwt.doOnlyTokenValid({
      showModal: true,
      keepSuccess: false,
      success: () => {
        if (cache.get('Gshow')) {
          this.setData({
            Gshow : cache.get('Gshow').value
          })
          wx.hideTabBar()
        }else{
           wx.showTabBar()
        } 
        this.userAlladd()
      },
      fail: () => {
        this.setData({
          isLoding: false,
          locdata: [],
          page:1
        })
        this.stopRefreshIcon();
        if(cache.get('Gshow')){
          cache.set('Gshow',{'key':'开启',value:0})
        }
        wx.switchTab({
          url:'/pages/index/index'
        })
      }
    })


  },

  // 下拉刷新
  stopRefreshIcon() {
    if (this.data.showPullDownRefreshIcon == true) {
      wx.stopPullDownRefresh();
      this.setData({
        showPullDownRefreshIcon: false
      })
    }
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
    if(cache.get('Gshow')){
      this.setData({
        flag :  true
      })
    }else{
      this.setData({
        flag :  false
      })
    }
    this.loadPageData()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.setData({
      Gshow : 0,
      flag : false,
    })
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
    this.setData({
      locdata: [],
      page: 1,
      hasMore: true,
      showPullDownRefreshIcon: true,
    })
    this.userAlladd();
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

  },

})