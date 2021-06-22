// pages/userinfo/realInformation/realInformation.js
import user from '../../../vendor/user/userDetails.js'
import jwt from '../../../vendor/auth/jwt.js';
import route from '../../../vendor/request/routes.js'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    srcss:'',
    idcard: '', //身份证信息
    originalId: '', //原数据
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
        label: '正面免冠照',
        value: '',
        disabled: true
      },
      {
        label: '设置新密码',
        value: '',
        disabled: true
      },
    ],
    faceimg: '', //正面照
    isLoding:false
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
  settingPsw(e) {
    let index = e.currentTarget.dataset.index
    if (index == 2) {
      if (this.data.faceimg) {
        //预览
        wx.navigateTo({
          url: "/pages/loginAndR/register/photo/photo"
        })
      } else {
        this.upload()
      }
    }
    if (index == 3) {
      wx.navigateTo({
        url: '/pages/userinfo/setPassword/setPassword'
      })
    }

  },
  //保存
  save() {
    let idcard = ''
    if (this.data.locdata[1].value == this.data.idcard) {
      idcard = this.data.originalId
    } else {
      idcard = this.data.locdata[1].value
    }
    wx.showLoading({
      title: '加载中'
    })
    user.updataRealname({
      data: {
        username: this.data.locdata[0].value,
        id_card_no: idcard,
        faceimg: this.data.faceimg
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
  Onchange(e) {
    let index = e.currentTarget.dataset.index
    let value = e.detail.value
    if (index == 0) {
      let val = 'locdata[0].value'
      this.setData({
        [val]: value
      })
    }
    if (index == 1) {
      let val = 'locdata[1].value'
      this.setData({
        [val]: value
      })
    }
  },
  //用户信息
  getUserinfo() {
    wx.showLoading({
      title: '加载中'
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
        app.userfaceimg = Users.faceimg
        let username = 'locdata[0].value'
        this.setData({
          [username]: Users.username
        })
        if (!Users.id_card_no) {
          let foc = 'locdata[1].focus'
          this.setData({
            [foc]: true
          })
          return;
        }
        let idcard = 'locdata[1].value'
        this.setData({
          [idcard]: Users.id_card_no.slice(0, 3) + '**********' + Users.id_card_no.slice(Users.id_card_no.length - 4, Users.id_card_no.length),
          idcard: Users.id_card_no.slice(0, 3) + '**********' + Users.id_card_no.slice(Users.id_card_no.length - 4, Users.id_card_no.length),
          originalId: Users.id_card_no,
          faceimg: Users.faceimg
        })
      },

    })
  },

  //上传正面照
  upload(){
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
    if(app.userfaceimg){
      this.setData({
        faceimg: app.userfaceimg,
      })
    }
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
          app.userfaceimg = data.data.url
          this.setData({
            faceimg: data.data.url,
          })
          
        }
      });
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
       this.setData({
         srcss:''
       })
     
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    app.userfaceimg = ''
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