// pages/userinfo/userphoto/userphoto.js
import route from '../../../vendor/request/routes.js'
	import userDetails from '../../../vendor/user/userDetails.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    srcss: '', //判断用户是否裁剪图片
    img: '', //照片
    isLoding: false ,//上传照片
    inform:''
  },
  

  //更换照片
  chooseAvatar(){
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

  //图片转换
   Updata(path){
    this.setData({
      isLoding : true
    })
    // 可以在此上传到服务端
    wx.uploadFile({
      url: route.services.file.upload,
      filePath: path,
      name: 'file',
      success: (res) => {
        if (res.statusCode != 200) {
          wx.showToast({
            title: '网络请求出错',
            icon:'none'
          });
          return;
        }
        let data = JSON.parse(res.data);
        if (data.code != 200) {
          wx.showToast({
            title: data.msg,
            icon:'none'
          });
          return;
        }
        userDetails.updataphoto({
          data: {
            faceimg: data.data.url
          },
          fail: () => {
            this.setData({
              isLoding : false
            })
            wx.showToast({
              title: '网络错误',
              icon:'none'
            })
          },
          success: (res) => {
            this.setData({
              isLoding : false
            })
            if (res.statusCode != 200) {
              wx.showToast({
                title: '网络请求出错',
                icon:'none'
              });
              return;
            }
            if (res.data.code != 200) {
              wx.showModal({
                title: '更新失败人脸图片失败',
                content: res.data.msg, 
                showCancel: false
              })
              return;
            }
            wx.showToast({
              title: res.data.msg,
              duration: 2000,
            });
            this.setData({
              inform : '更新成功',
              img : data.data.url
            })
          }
        })
      }
    });
   },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      img : options.photo
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
    if(this.data.srcss) {
      this.Updata(this.data.srcss)
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.setData({
      srcss : ''
    })
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