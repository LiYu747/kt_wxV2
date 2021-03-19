// pages/userMessenger/applyingTo/applyingTo.js
import route from '../../../vendor/request/routes.js'
import home from '../../../vendor/home/home.js'
import user from '../../../vendor/user/userDetails.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    remark: '', //备注
    image: [], //上传图片
    isLoding: false,
    locdata: [{
        label: '姓名',
        value: '',
        disabled: true
      },
      {
        label: '所属平台',
        value: '',
        placeholder: '请输入平台',
        disabled: false
      },
      {
        label: '工号',
        value: '',
        placeholder: '请输入工号',
        disabled: false
      },
    ]
  },


  // 去申请进度
  //申请记录
  goRecord() {
    wx.navigateTo({
      url: '/pages/userMessenger/applyingRecord/applyingRecord'
    })
  },
  // 提交
  submit(){    
    if (this.data.locdata[1].value == '') {
      wx.showToast({
        title: "请填写所属平台",
        icon: 'none'
      })
      return;
    }
    if (this.data.locdata[2].value == '') {
      wx.showToast({
        title: "请填写平台工号",
        icon: 'none'
      })
      return;
    }
    if (this.data.isLoding == true) return;
    wx.showLoading({
      title: '加载中'
    })
    home.applyToBecome({
      data: {
        platform: this.data.locdata[1].value,
        code: this.data.locdata[2].value,
        files: this.data.image,
        user_remark: this.data.remark
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
        wx.showToast({
          title: res.data.msg
        })
        let val = 'locdata[1].value'
        let value = 'locdata[2].value'
        this.setData({
          [val] : '',
          [value] : '',
          image : [],
          remark : ''
        })
      }
    })
  },
    //备注
    Onareachenge(e){
     this.setData({
      remark : e.detail.value
     })
    },
  	// 选择附件
    pushBtn() {
      wx.chooseImage({
        extension: ['jpg', 'jpeg', 'png', 'gif'],
        success: (chooseImageRes) => {
          const files = chooseImageRes.tempFilePaths;
          this.setData({
            isLoding : true
          })
          let that = this;

          if (files.length == 0) return;

          let func = [];
          files.forEach((item) => {
            func.push(that.upload(item));
          });

          Promise.all(func).then((res) => {
            this.setData({
              isLoding : false
            })
          }).catch((err) => {
            this.setData({
              isLoding : false
            })
            wx.showModal({
              title: "上传文件出错:" + err,
            })
          })
        }
      })
    },
    upload(fileItem) {
      let that = this;
      return new Promise((res, rej) => {
        wx.uploadFile({
          url: route.services.file.upload,
          filePath: fileItem,
          name: 'file',
          fail: (err) => {
            rej('网络出错');
          },
          success: (val) => {
            if (val.statusCode != 200) {
              rej(val.statusCode);
              return;
            }

            let jres = JSON.parse(val.data);

            if (jres.code != 200) {
              rej(jres.msg);
              return;
            }
            if (that.data.image.length < 3) {
              that.data.image.push(jres.data.url)
              this.setData({
                image :  that.data.image
              })
            } else {
              wx.showToast({
                title: '数量不超过三张',
                icon: "none"
              })
            }
            res(jres);
          }
        })
      })
    },
  // 获取输入的值
  Onchange(e){
    let index = e.currentTarget.dataset.index
    if(index == 0) return;
      let value = 'locdata' + '[' + index + ']' + '.value'
      this.setData({
        [value] : e.detail.value
      })
  },
  //获取用户资料
  getuserinfo() {
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
        if (res.statusCode != 200){
          wx.showToast({
            title: '网络出错了',
            icon: "none"
          })
          return;
        }
        if (res.data.code != 200) return;
        let Users = res.data.data
        let username = 'locdata[0].value'
        this.setData({
          [username] :  Users.username
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
  this.getuserinfo()
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