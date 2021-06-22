// pages/loginAndR/register.js
import sms from '../../../vendor/sms/sms'
import route from '../../../vendor/request/routes'
import cache from '../../../vendor/cache/cache'
import userinfo from '../../../vendor/user/userinfo.js'
import config from '../../../vendor/config/config'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    customBar:wx.getSystemInfoSync().statusBarHeight + 47 ,
    srcss: '', //判断用户是否裁剪图片
    flag: false, //验证码变量
    text: '获取验证码',
    codebtn: true, //验证码按钮
    timer: '', //倒计时时间
    avatar: 'https://oss.kuaitongkeji.com/static/img/avatar/male_64.png', //用户头像
    nickname: '',
    password:'',
    confirmpass:'',
    phone: '',
    code: '',
    isLoding: false, //上传照片 
    radio: '1', //选择的性别1为男，2为女
  },
   
  //单选框
  onChange(event) {
    this.setData({
      radio: event.detail,
    });
  },

  //登录密码
  passChange(e){
  this.data.password = e.detail.value
  if(e.detail.cursor < 6){
     wx.showToast({
       title: '密码至少6位',
       icon:'none',
       duration:2000
     })
  }
  if(this.data.confirmpass && this.data.confirmpass != e.detail.value){
    wx.showToast({
      title: '两次密码不一致',
      icon:'none',
      duration:2000
    })
  }
},

  //确认密码
  confirmChange(e){
    this.data.confirmpass = e.detail.value
    if(e.detail.value != this.data.password){
      wx.showToast({
        title: '两次密码不一致',
        icon:'none',
        duration:2000
      })
    }
  },

  // 注册
  register: function () {
    if (this.data.isLoding == true) return;
    if (this.data.nickname == '') {
      wx.showToast({
        title: '请输入昵称',
        icon: 'none'
      })
      return;
    }
    if(this.data.password == ''){
      wx.showToast({
        title: '请输入登录密码',
        icon: 'none'
      })
      return;
    }
    if (this.data.confirmpass == '') {
      wx.showToast({
        title: '请输入确认密码',
        icon: 'none'
      })
      return;
    }
    if (this.data.phone == '') {
      wx.showToast({
        title: '请输入手机号',
        icon: 'none'
      })
      return;
    }
    if (this.data.code == '') {
      wx.showToast({
        title: '请输入验证码',
        icon: 'none'
      })
      return;
    }
    wx.showLoading({
      title: '加载中...'
    })
    userinfo.register({
      data: {
        nickname: this.data.nickname,
        secret: this.data.password,
        secret_confirmation: this.data.confirmpass,
        tel: this.data.phone,
        sms_code: this.data.code,
        avatar: this.data.avatar,
        sex: this.data.radio
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
          icon: 'none',
          duration: 2000
        });
        const time = setTimeout(() => {
          wx.navigateBack({
            delta: 1,
          })
           clearTimeout(time)
         }, 2000)
         
      },
    })
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
        use_to: 'user_reg',
        tel: this.data.phone
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
        var timer = 60
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
  //上传照片
  UploadAvatar: function () {
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: res => {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        wx.navigateTo({
          url: '/components/cropper/cropper-example?img=' + tempFilePaths[0],
        })
      }
    })
  },
  //返回
  goback: function(){
        wx.navigateBack({
          delta:1
        })
  },
  nicknamechange: function (v) {
    this.setData({
      nickname: v.detail.value
    })
  },
  phonechange: function (v) {
    this.setData({
      phone: v.detail.value
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
  onLoad: function (options) {

  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    config.ready( (data) => {
      if(!data.base.user_default_avatar) return;
      this.setData({
        avatar :  data.base.user_default_avatar
      })
    })
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (this.data.srcss) {
      this.setData({
        isLoding: true
      })
      wx.uploadFile({
        url: route.services.file.upload,
        filePath: this.data.srcss,
        name: 'file',
        complete: (res) => {
          this.setData({
            isLoding: false
          })
          if (res.statusCode != 200) {
            wx.showToast({
              title: '网络请求出错',
              icon: 'none'
            });
            return;
          }
          let data = JSON.parse(res.data)
          if (data.code != 200) {
            wx.showToast({
              title: data.msg,
              icon: 'none'
            });
            return;
          }
          wx.showToast({
            title: '上传成功',
            icon: 'none'
          })
          this.setData({
            avatar: data.data.url,
          })
        }
      });
    }

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