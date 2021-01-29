// pages/userAddress/userAddress.js
import jwt from '../../vendor/auth/jwt.js'
import address from '../../vendor/address/address.js'
//  import cache from '../../vendor/cache/cache.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    rotateTimes: 1,
    pushshow: true, //是否显示添加入住申请
    message: true,//显示电梯提示
    flag: false,
		msg: '', //电梯提示类容
    idx: 0,
    locdata: [], //数据列表
    page: 1,
    ps: 15,
    isLoding: false,
    hasMore: true,
    showPullDownRefreshIcon: false,

  },
  //预约电梯
  order(e) {
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
          flag : true
          })
        } else {
          this.setData({
            message : false,
            msg : res.data.msg,
            flag : true
            })
        }
        console.log(res.data.code);
      }
    })
  },
   //知道了
   sure () {
     this.setData({
      flag : false
     })
   },
  //进入论坛
  Select(e) {
    let val = e.currentTarget.dataset
    console.log(e.currentTarget.dataset)
    this.setData({
      idx: val.index
    })
  },
  push() {
    this.setData({
      rotateTimes: this.data.rotateTimes + 1
    })
    if (this.data.rotateTimes % 2 === 0) {
      this.setData({
        pushshow: false
      })
    } else {
      this.setData({
        pushshow: true
      })
    }
  },
  // 用户所有地址
  loadPageData() {
    jwt.doOnlyTokenValid({
      showModal: true,
      keepSuccess: false,
      success: () => {
        this.setData({
          isLoding: true
        })
        address.alladd({
          data: {
            page: this.data.page,
            pageSize: this.data.ps,
          },
          fail: () => {
            this.setData({
              isLoding: false
            })
            this.stopRefreshIcon();
            uni.showToast({
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
            this.setData({
              hasMore: data.next_page_url ? true : false
            })
            data.data.map(item => {
              if (item.own_village) {
                item.address = item.own_village.name + item.own_building.name + item.own_apartment.name + item.own_floor.name + item.own_room.room_number
              }
            })
            this.setData({
              locdata: data.data
            })
          }
        })
      },
      fail: () => {
        this.setData({
          isLoding: false,
          locdata: []
        })
        this.stopRefreshIcon();
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
    this.loadPageData()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.setData({
      rotateTimes: 1,
      pushshow : true
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
    this.loadPageData();
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