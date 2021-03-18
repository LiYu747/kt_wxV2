// pages/propertyManagement/CheckToSee/seeDetails/seeDetails.js
import home from '../../../../vendor/home/home.js'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    state: '', //处理状态
    stateCode:'',//处理状态码
    remark: '', //备注
    result: '', //结果
    files:[],//附件
    verify_status: '', //选择结果
    locdata: [{
        label: '姓名',
        value: ''
      },
      {
        label: '电话',
        value: ''
      },
      {
        label: '身份证号',
        value: ''
      },
      {
        label: '地址',
        value: ''
      },
      {
        label: '时间',
        value: ''
      }
    ]
  
  },
    
  // 通过
  pass() {
    this.setData({
      verify_status : '2'
    })
    this.auditreq('已通过')
  },
  //不通过
  nopass() {
    this.setData({
      verify_status : '3'
    })
    this.auditreq('未通过')
  },
  //操作请求
  auditreq(text) {
     
    wx.showLoading({
      title: '加载中'
    })
    home.auditRecord({
      data: {
        id: this.data.id,
        verify_status: this.data.verify_status,
        verify_msg: this.data.result
      },
      fail: () => {
        wx.hideLoading()
        wx.showToast({
          title: '网络错误',
          icon: "none"
        })
      },
      success: (res) => {
        wx.hideLoading()
        if (res.statusCode != 200) {
          wx.showToast({
            title: '网络出错了',
            icon: "none"
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
          title: res.data.msg
        })
        const time = setTimeout(() => {
          this.getData()
          app.checkSeePass = text
          clearTimeout(time)
        }, 1500)
      }
    })
  }, 
   //申请结果
   Onareachenge(e){
    this.setData({
      result : e.detail.value
    })
   },
  	// 获取数据
    getData() {
      wx.showLoading({
        title: '加载中'
      })
      home.checkinDetails({
        data: {
          id: this.data.id
        },
        fail: () => {
          wx.hideLoading()
          wx.showToast({
            title: '网络错误',
            icon: "none"
          })
        },
        success: (res) => {
          wx.hideLoading()
          if (res.statusCode != 200) {
            wx.showToast({
              title: '网络出错了',
              icon: "none"
            })
            return;
          }
          if (res.data.code != 200) {
            wx.showToast({
              title: res.data.msg,
              icon: "none"
            })
            return;
          }
          let data = res.data.data
          // console.log(data);
          let username = 'locdata[0].value'
          let tel = 'locdata[1].value'
          let IDcard = 'locdata[2].value' 
          let village = 'locdata[3].value'
          let created = 'locdata[4].value'
          this.setData({
            [username] : data.own_user.username,
            [tel] : data.own_user.tel.slice(0,3) + '****' + data.own_user.tel.slice(7,11),
            [IDcard] : data.own_user.id_card_no.slice(0,3) + '***********' + data.own_user.id_card_no.slice(14,18),
            [village] : data.own_village.name + data.own_building.name + data.own_apartment.name + data.own_floor.name + data.own_room.room_number,
            [created] : data.created_at.slice(0, 16),
            state : data.verify_status_text,
            stateCode :  data.verify_status,
            remark : data.user_remark,
            files : data.files
          })
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