// pages/residence/houseOwner/houseOwner.js
import home from '../../../vendor/home/home.js'
import cache from '../../../vendor/cache/cache.js'
import user from '../../../vendor/user/userDetails.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    text: '',  //申请结果
    remark: '',  //备注
    result: '', //结果
    locadata: [{
        titel: '姓名',
        value: ''
      },
      {
        titel: '地址',
        value: ''
      },
      {
        titel: '时间',
        value: ''
      }
    ],
    id: ''  //传的id
  },
   
   
	pass(){
    // 2是通过
    this.operate(2)
  },
  // 不通过
  nopass(){
  // 3是bu通过
    this.operate(3)
  },
  // 获取备注
  Ochenge(e){
   this.setData({
    result : e.detail.value
   })
  },
  operate(status){
    wx.showLoading({
      title:'加载中'
    })
    home.audit({
      data:{
        id:this.data.id,
        verify_status:status,
        verify_msg:this.data.result
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
        if (res.statusCode != 200){
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
          icon: 'none'
        })
        const time = setTimeout(() => {
          this.loadPageData()
          clearTimeout(time)
        }, 1500)
      },
    })
  },
  	// 获取数据
    loadPageData() {
      wx.showLoading({
        title:'加载中...'
      })
      home.userLook({
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
          // console.log(res);
          wx.hideLoading()
          if (res.statusCode != 200) return;

          if (res.data.code != 200) return;
          let data = res.data.data
          if (data.verify_status == 1) {
            data.verify_status_text = '审核中'
          }
          if (data.verify_status == 2) {
            data.verify_status_text = '通过'
          }
          if (data.verify_status == 3) {
            data.verify_status_text = '未通过'
          }
          if(data.own_village){
            let village = 'locadata[1].value'
            this.setData({
              [village] : '' + data.own_village.name + data.own_building.name + data.own_apartment.name + data.own_building.name + data.own_room.room_number
            })
          }
          let name = 'locadata[0].value'
          let created = 'locadata[2].value'
          this.setData({
              [name] : data.own_user.username,
              [created] :  data.created_at.slice(0, 16),
              text : data.verify_status_text,
              remark : data.user_remark,
          })
        },
        
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
   this.loadPageData()
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