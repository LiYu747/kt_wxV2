// pages/communityForum/release/release.js
import village from '../../../vendor/village/village.js';
import route from '../../../vendor/request/routes.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    image: [],
    show: false, //弹出层的显示与隐藏
    tagdata: [{
        name: '全部',
        type: true,
        default: true
      },
    ],
    choiceData: [], //选中标签的数组
    title: '', // 标题
    content: '', //内容
    isLoding: false,
    choiceID: [], //标签选中的id
    seeShow: false,
    idx: "",
  },
     

  //提交
  Submit(){
    if (this.data.isLoding == true) return;
    if(!this.data.title){
      wx.showToast({
        title:"请填写标题",
        icon:"none"
      })
      return;
    }
    if(this.data.choiceID.length == 0){
      wx.showToast({
        title:"请选择类别",
        icon:"none"
      })
      return;
    }
    if(!this.data.content){
      uni.showToast({
        title:"请填写内容",
        icon:"none"
      })
      return;
    }
    wx.showLoading({
      title: '提交中'
    })
    village.releasePost({
      data: {
        village_id: this.data.id,
        title: this.data.title,
        content: this.data.content,
        album: this.data.image,
        cate_id:this.data.choiceID,
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
          duration: 2000,
        })
        // 清空
        this.setData({
          image : [],
          title : '',
          content : '',
          choiceData : []
        })
        // console.log('发布帖子', res);
      }
    })
  },
    // 取消选择
    onSeeClose(){
      this.setData({
        seeShow : false
      })
    },



  // 确定选择
  ok() {
    let list = []
    list = this.data.tagdata.filter(item => {
      return item.type == true
    })
    list.map(item => {
      if (item.default) return
      this.data.choiceID.push(item.id)
      this.setData({
        choiceID :  this.data.choiceID 
      })
    })
    this.setData({
      choiceData : list,
      choiceID : this.data.choiceID,
      show : false
    })
  },
  // 选中
  choice(e) {
    let item = e.currentTarget.dataset.item
    let index = e.currentTarget.dataset.index
    if (item.default) return
    let lists = this.data.tagdata
    lists.map((item, idx) => {
      if (index == idx) {
        item.type = !item.type
      }
    })
    this.setData({
      tagdata: lists
    })
  },
  //获取默认栏目列表
  grtColumn() {
    village.DefaultColumnList({
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
        res.data.data.map(item => {
          item.type = false
        })
        let lists = this.data.tagdata
        lists = lists.concat(res.data.data)
        this.setData({
          tagdata: lists
        })
      }
    })
  },
  // 关闭选择
  clier() {
    this.setData({
      show: false
    })
  },
  onClose() {
    this.setData({
      show: false
    })
  },
  //选择标签
  celTags() {
    this.setData({
      show: true
    })
  },
  //获取内容
  OnContent(e) {
    this.setData({
      content: e.detail.value
    })
  },
  //获取标题
  onTitle(e) {
    this.setData({
      title: e.detail.value
    })
  },
  // 上传文件
  add() {
    wx.chooseImage({
      extension: ['jpg', 'jpeg', 'png', 'gif'],
      success: (chooseImageRes) => {
        const files = chooseImageRes.tempFilePaths;
        this.setData({
          isLoding: true
        })
        let that = this;

        if (files.length == 0) return;

        let func = [];
        files.forEach((item) => {
          func.push(that.upload(item));
        });

        Promise.all(func).then((res) => {
          that.setData({
            isLoding: false
          })
        }).catch((err) => {
          that.setData({
            isLoding: false
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
        fail: () => {
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
          that.data.image.push(jres.data.url)
          that.setData({
            image: that.data.image
          })

          res(jres);
        }
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.grtColumn()
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