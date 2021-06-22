// pages/loginAndR/login/login.js
import sms from '../../../vendor/sms/sms'
import userinfo from '../../../vendor/user/userinfo'
import jwt from '../../../vendor/auth/jwt';
import cache from '../../../vendor/cache/cache'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    customBar:0,
    iSlogin: false,
    flag: false,
    text: '获取验证码',
    codebtn: true,
    timer: 60,
    loginMethod: 'secret', //默认密码登录为secret,验证码登录sms，
    phone: '',
    password: '',
    code: '',
  },
  //登录
  Login: function () {
    if (this.data.phone == '') {
      wx.showToast({
        title: '请输入手机号',
        icon: 'none'
      })
      return;
    }
    wx.showLoading({
      title: '加载中...'
    })
    userinfo.Signin({
      data: {
        login_method: this.data.loginMethod,
        tel: this.data.phone,
        sms_code: this.data.code,
        secret: this.data.password
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

        let info = jwt.parseToken(res.data.data.jwt.token);

        if (!info) return;

        // console.log('login data',info);

        jwt.setToken(res.data.data.jwt.token, info.exp * 1000 - 10000, () => {
          jwt.execTask();
        })
        cache.set('loginTel',this.data.phone)
        wx.showToast({
          title: res.data.msg,
          icon: 'none'
        })
        const time = setTimeout(() => {
          wx.navigateBack({
            delta: 1,
          })
          clearTimeout(time)
        }, 2000)
      },
    })
},

// 切换登录
cut: function () {
  this.setData({
    iSlogin: !this.data.iSlogin
  })
  // this.iSlogin 为true 是验证码 ,反之
  if (this.data.iSlogin == true) {
    this.setData({
      loginMethod: 'sms'
    })
  }
  if (this.data.iSlogin == false) {
    this.setData({
      loginMethod: 'secret'
    })
  }
},

// 获取验证码
addvercode: function () {
  if (this.data.codebtn == false) return;
  if (this.data.phone == '') {
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
      tel: this.data.phone,
      use_to:'user_login',
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
        icon: 'none'
      })
      var that = this;
      var timer = 10
      const authtime = setInterval(function () {
        that.setData({
          codebtn: false,
          timer: timer--,
          text: '验证码' + '(' + timer + 's' + ')',
        })
        if (timer <= 0) {
          that.setData({
            codebtn: true,
            text: '重新发送',
          })
          clearInterval(authtime)
        }
      }, 1000)
    }
  })

},

// 返回按钮
goback: function () {
  wx.navigateBack({
    delta: 1
  })
},
// 去注册
register: function () {
  wx.navigateTo({
    url: '/pages/loginAndR/register/register'
  })
},
// 找回密码
find: function () {
wx.navigateTo({
  url: '/pages/loginAndR/findPsw/findPsw',
})
},

phonechange: function (v) {
  this.setData({
    phone: v.detail.value
  })
},
passwordchange: function (v) {
  this.setData({
    password: v.detail.value
  })
},
codechange: function (v) {
  this.setData({
    code: v.detail.value
  })
},

/**
 * 生命周期函数--监听页面加载
 */
onLoad: function (val) {

},

/**
 * 生命周期函数--监听页面初次渲染完成
 */
onReady: function () {
  this.setData({
    customBar : wx.getSystemInfoSync().statusBarHeight + 47 
  })
  if(!cache.get('loginTel')) return;
  this.setData({
    phone : cache.get('loginTel')
  })
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