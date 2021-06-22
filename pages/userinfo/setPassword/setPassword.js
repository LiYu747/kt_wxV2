// pages/userinfo/setPassword/setPassword.js
import user from '../../../vendor/user/userDetails.js'
import sms from '../../../vendor/sms/sms'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    locadata: [{
        label: '手机号',
        value: '',
        placeholder: '请输入手机号',
        errorMessage: ''
      },
      {
        label: '旧密码',
        value: '',
        placeholder: '请输入旧密码',
        errorMessage: '',
        type: true
      },
      {
        label: '新密码',
        value: '',
        placeholder: '请输入新密码',
        errorMessage: '',
        type: true
      },
      {
        label: '确认密码',
        value: '',
        placeholder: '确认密码',
        errorMessage: '',
        type: true
      },
      {
        label: '验证码',
        value: '',
        placeholder: '请输入验证码',
      },
    ],
    falgWay: false,
    setWay: '使用旧密码修改',
    verify_method: 'sms_code', //修改密码的方式 old_secret：验证旧密码；sms_code：短信验证码
    flag: false,
    text: '获取验证码',
    code: true,
    timer: 60,
    idx: 1
  },

  //  保存
  save() {
    wx.showLoading({
      title: '加载中'
    })
    let code = ''
    if(this.data.locadata[4]){
      code = this.data.locadata[4].value
    }
    user.steNewpaw({
      data: {
        method: this.data.verify_method,
        new_secret: this.data.locadata[2].value,
        new_secret_confirmation: this.data.locadata[3].value,
        old_secret:this.data.locadata[1].value,
        sms_code: code
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
            title: '网络请求出错',
            icon: 'none'
          });
          return;
        }
        if (res.data.code != 200) {
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          });
          return;
        }
        wx.showToast({
          title: res.data.msg,
          duration:2000
        });
        const setTime = setTimeout( () => {
            wx.navigateBack({
              delta: '1',
            })
            clearTimeout(setTime)
        },2000)
      }
    })

  },

  //切换方式
  curWay() {
    this.setData({
      falgWay: !this.data.falgWay
    })
    if (this.data.falgWay == false) {
      let arr = {
        label: '验证码',
        value: '',
        placeholder: '请输入验证码',
      }
      this.setData({
        locadata: this.data.locadata.concat(arr),
        verify_method: 'sms_code',
        setWay: '使用旧密码修改',
        idx: 1
      })
    }
    if (this.data.falgWay == true) {
      this.setData({
        locadata: this.data.locadata.slice(0, 4),
        verify_method: 'old_secret',
        setWay: '手机验证码修改',
        idx: 0
      })
    }
  },
  // 获取验证码
  addvercode() {
    if (this.data.code != true) return;
    if (this.data.locadata[0].value == '') {
      wx.showToast({
        title: '请输入手机号',
        icon: 'none'
      })
      return;
    }
    wx.showLoading({
      title: '发送中...'
    })
    sms.smsSend({
      data: {
        tel: this.data.locadata[0].value,
        use_to:'user_reset_password'
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
        if (res.statusCode != 200) {
          wx.showToast({
            title: '网络请求出错',
            icon: 'none'
          });
          return;
        }
        if (res.data.code != 200) {
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          });
          return;
        }
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: 2000
        })
        // console.log(res.data.data.code);
        const authtime = setInterval(() => {
          this.setData({
            code: false,
            timer: this.data.timer - 1,
            text: '验证码' + '(' + this.data.timer + 's' + ')'
          })
          if (this.data.timer < 0) {
            this.setData({
              timer: 60,
              text: '重新发送',
              code: true
            })
            clearInterval(authtime)
          }
        }, 1000)
      },
    })
  },

  // 判断两次密码
  Onblur(e) {
    let index = e.currentTarget.dataset.index
    let value = e.detail.value
    if(index == 2){
      let msg = 'locadata.[2].errorMessage'
       if(value.length<6){
        this.setData({
          [msg]: '密码至少6位'
        })
       }
       else if(value == this.data.locadata[1].value){
        this.setData({
          [msg]: '新密码不能与旧密码相同'
        })
       }
       else{
        this.setData({
          [msg]: ''
        })   
       }
    }
    if (index == 3) {
      if (value == this.data.locadata[2].value) {
        let msg = 'locadata.[3].errorMessage'
        this.setData({
          [msg]: ''
        })

      } else {
        let msg = 'locadata.[3].errorMessage'
        this.setData({
          [msg]: '两次密码不一致'
        })
      }
    }
  },
  // 获取用户输入信息
  Onchange(e) {
    let index = e.currentTarget.dataset.index
    let value = e.detail
    if (index == 0) {
      let val = 'locadata[0].value'
      this.setData({
        [val]: value
      })
    }
    if (index == 1) {
      let val = 'locadata[1].value'
      this.setData({
        [val]: value
      })
    }
    if (index == 2) {
      let val = 'locadata[2].value'
      this.setData({
        [val]: value
      })
    }
    if (index == 3) {
      let val = 'locadata[3].value'
      this.setData({
        [val]: value
      })
    }
    if (index == 4) {
      let val = 'locadata[4].value'
      this.setData({
        [val]: value
      })
    }
  },
  //用户信息
  getUserinfo() {
    user.userDeta({
      data: {},
      fail: () => {
        wx.showToast({
          title: '网络错误',
          icon: 'none'
        })
      },
      success: (res) => {
        if (res.statusCode != 200) return;
        if (res.data.code != 200) return;
        let Users = res.data.data
        let tel = 'locadata[0].value'
        this.setData({
          [tel]: Users.tel
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