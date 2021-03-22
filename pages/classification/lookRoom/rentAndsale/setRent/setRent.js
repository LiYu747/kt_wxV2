// pages/classification/lookRoom/rentAndsale/setRent/setRent.js
import home from '../../../../../vendor/home/home.js'
import cache from '../../../../../vendor/cache/cache.js'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    checked: false,
    id: ''
  },


	//更新数据
  updatamsg(){
    wx.navigateTo({
      url:'/pages/classification/lookRoom/rentalForm/rentalForm?id=' + this.data.id
    })
  },
  //删除
  aadDel() {
    wx.showModal({
      content: '您确定要删除吗',
      success: (res) => {
        if (res.cancel == true) return;
        home.delrenRoom({
          data: {
            id: this.data.id
          },
          fail: () => {
            wx.showToast({
              title: '网络问题',
              icon: 'none'
            })
          },
          success: (res) => {
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
            wx.showToast({
              title: res.data.msg,
              icon: 'none',
              duration: 2000
            })
            let settime = setTimeout(() => {
              wx.navigateBack({
                delta: 2
              })
              clearTimeout(settime)
            }, 2000)
            app.roomIsDel = res.data.code
          }
        })

      }
    })
  },
  //  更改可见性
  onChange() {
    this.setData({
      checked: !this.data.checked
    })
    this.isLook(this.data.checked)
  },
  //更改可见性
  isLook(show) {
    home.rentShow({
      data: {
        id: this.data.id,
        is_show: show
      },
      fail: () => {
        wx.showToast({
          title: '网络错误',
          icon: 'none'
        })
      },
      success: (res) => {
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
        cache.set('isShow', show)
        wx.showToast({
          title: res.data.msg,
          icon: 'none'
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let isShow = cache.get('isShow')
    if (isShow == 0) {
      this.setData({
        checked: false
      })
    }
    if (isShow == 1) {
      this.setData({
        checked: true
      })
    }
    this.setData({
      id: options.id
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