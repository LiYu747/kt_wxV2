// pages/userinfo/realInformation/realInformation.js
import user from '../../../vendor/user/userDetails.js'
import jwt from '../../../vendor/auth/jwt.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    idcard:'',//身份证信息
    originalId:'',//原数据
    locdata: [{
        label: '真实姓名',
        value: ''
      },
      {
        label: '身份证号',
        value: '',
        focus: false,
        placeholder: '请输入您的身份证号'
      },
      {
        label: '设置新密码',
        value: '',
        disabled:true
      },
    ]
  },
   
   // 退出登录
   logOut() {
    wx.showModal({
      content: '您确定要退出吗',
      success: (res => {
        if (res.confirm) {
          jwt.flush({
            success: () => {
              wx.navigateBack({
                delta: 1
              })
            }
          });
        }
      })
    })
  },
  //设置密码
  settingPsw(e){
    let index = e.currentTarget.dataset.index
    if(index != 2) return;
    wx.navigateTo({
     url:'/pages/userinfo/setPassword/setPassword'	
    })
  },
  //保存
  save() {
    let idcard = ''
    if(this.data.locdata[1].value == this.data.idcard){
      idcard = this.data.originalId
    }
    else{
      idcard = this.data.locdata[1].value
    }
    wx.showLoading({
      title:'加载中'
    })
    user.updataRealname({
      data: {
        username: this.data.locdata[0].value,
        id_card_no:idcard
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
        };
        wx.showToast({
          title: res.data.msg,
        })
      }
    })
  },
  // 获取输入框值
  Onchange(e){
   let index = e.currentTarget.dataset.index
   let value = e.detail.value
   if(index == 0){
     let val = 'locdata[0].value'
     this.setData({
       [val] : value
     })     
   }
   if(index == 1){
    let val = 'locdata[1].value'
    this.setData({
      [val] : value
    })  
   }
  },
  //用户信息
  getUserinfo() {
    wx.showLoading({
      title:'加载中'
    })
    user.userDeta({
      data: {},
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
        if (res.data.code != 200) return;
        let Users = res.data.data
         let username = 'locdata[0].value'
         this.setData({
           [username] : Users.username
         })
        if (!Users.id_card_no) {
          let foc = 'locdata[1].focus'
          this.setData({
            [foc] : true
          })
          return;
        }
        let idcard = 'locdata[1].value'
        this.setData({
          [idcard] : Users.id_card_no.slice(0, 3) + '**********' + Users.id_card_no.slice(Users.id_card_no.length -4, Users.id_card_no.length),
          idcard :  Users.id_card_no.slice(0, 3) + '**********' + Users.id_card_no.slice(Users.id_card_no.length -4, Users.id_card_no.length),
          originalId : 	Users.id_card_no
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
    this.getUserinfo()
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