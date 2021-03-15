// pages/userinfo/personal/personal.js
import userDetails from '../../../vendor/user/userDetails.js'
	import route from '../../../vendor/request/routes.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    image: '', //头像
    parameter: [{
        value: '',
        label: '昵称',
      },
      {
        value: '',
        label: '性别',
        disabled: true
      },
      {
        value: '预览',
        label: '正面免冠照',
        disabled: true
      },
      {
        value: '',
        label: '真实姓名',
        disabled: true
      },
      {
        value: '',
        label: '手机号码',
        disabled: true
      },
      {
        value: '',
        label: '身份证号码',
        disabled: true
      }
    ],
    show: false, //打开性别选择
    list: [{
        value: '1',
        label: '男'
      },
      {
        value: '2',
        label: '女'
      }
    ],
    sex: '', //性别id
    flag: false, //判断用户是否选择了头像
    faceimg: '', //证件照
    value: [], //默认选择
    isLoding: false //上传照片
  },
   

  // 提交
  Submit() {
    if (this.data.isLoding == true) return;
    wx.showLoading({
      title: "提交中..."
    })
    let name = this.data.parameter[0].value
    userDetails.userupdate({
      data: {
        nickname: name,
        avatar: this.data.image,
        sex: this.data.sex
      },
      fail: () => {
        wx.hideLoading()
        wx.showToast({
          title: '网络错误',
          icon:'none'
        })
      },
      success: (res) => {
        wx.hideLoading()
        if (res.statusCode != 200) {
          wx.showToast({
            title: '网络请求出错',
            icon:'none'
          });
          return;
        }
        if (res.data.code != 200) {
          wx.showToast({
            title: res.data.msg,
            icon:'none'
          });
          return;
        }
        wx.showToast({
          title: res.data.msg,
          duration: 2000
        })
      },
    })
  },

  //获取昵称
  Onchange(e){
   let index = e.currentTarget.dataset.index
   let value = e.detail.value
   if(index == 0){
     let val = 'parameter[0].value'
     this.setData({
       [val] : value
     })
   }
  },
  // 性别确定按钮
  onConfirm(val) {
    let value = val.detail.value
    let sex = 'parameter[1].value'
    this.setData({
      [sex] : value.label,
      sex : value.value,
      show: false
    })
    if (this.data.sex == 2 && this.data.flag == true) {
      this.setData({
        image : 'https://oss.kuaitongkeji.com/static/img/avatar/female_64.png'
      })
    }
  },
  //取消选择
  onCancel(){
   this.onClose()
  },
  onClose(){
   this.setData({
     show: false
   })
  },
  xuaz(e) {
     let index = e.currentTarget.dataset.index
    // 选择性别
    if (index == 1) {
      this.setData({
        show : true
      })
    }
    // 预览证件照
    if (index == 2) {
      wx.navigateTo({
        url: `/pages/userinfo/userphoto/userphoto?photo=${this.data.faceimg}`
      })
    }
  },
  // 上传头像
  UploadAvatar() {
    wx.chooseImage({
      success: (chooseImageRes) => {
        this.setData({
          isLoding : true
        })
        const tempFilePaths = chooseImageRes.tempFilePaths;
        if (tempFilePaths.length == 0) return;
        wx.uploadFile({
          url: route.services.file.upload, 
          filePath: tempFilePaths[0],
          name: 'file',
          fail : () => {
            this.setData({
              isLoding : false
            })
            wx.showToast({
              title: '网络出错',
              icon:'none'
            });
          },
          success: (val) => {
            this.setData({
              isLoding : false
            })
            if (val.statusCode != 200) {
              wx.showToast({
                title: '网络请求出错',
                icon:'none'
              });
              return;
            }

            let data = JSON.parse(val.data)
            if (data.code != 200) {
              wx.showToast({
                title: data.msg,
                icon:'none'
              });
              return;
            }
            wx.showToast({
              title: '上传成功',
              icon: "none"
            })
            this.setData({
              image :  data.data.url,
              flag : false
            })
          }
        })
      }
    });
  },
  // 获取用户资料
  UserData() {
    wx.showLoading({
      title: '加载中...'
    })
    userDetails.userDeta({
      fail: () => {
        wx.hideLoading()
        wx.showToast({
          title: '网络错误',
          icon:'none'
        })
      },
      success: (res) => {
        wx.hideLoading()
        if (res.statusCode != 200) {
          wx.showToast({
            title: '网络请求出错',
            icon:'none'
          });
          return;
        }
        if (res.data.code != 200) {
          wx.showToast({
            title:res.data.msg,
            icon:'none'
          });
          return;
        }
        // console.log(res.data.data);
        let data = res.data.data
        if(data.avatar == 'https://oss.kuaitongkeji.com/static/img/avatar/male_64.png'){
          this.setData ({
            flag : true
          })
        }	
        let msg  = ''
        if (data.sex == 1) {
          msg = '男'
        }
        if (data.sex == 2) {
          msg = '女'
        }
        let nickname = 'parameter[0].value'
        let sex = 'parameter[1].value'
        let username = 'parameter[3].value'
        let tel = 'parameter[4].value'
        this.setData({
          [nickname] : data.nickname,
          [sex] : msg,
          [username] :  data.username,
          [tel] : data.tel.slice(0,3) + '****' +data.tel.slice(7,11),
          faceimg : data.faceimg,
          image :  data.avatar,
          sex : String(data.sex)
        })
        if(data.id_card_no){
          let idCard = 'parameter[5].value'
          this.setData({
            [idCard]  : data.id_card_no.slice(0,3) + '**********' + data.id_card_no.slice(data.id_card_no.length-4,data.id_card_no.length) 
          })
        }
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
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.UserData()
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