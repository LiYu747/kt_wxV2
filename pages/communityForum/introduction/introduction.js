// pages/communityForum/introduction/introduction.js
import village from '../../../vendor/village/village.js'
import jwt from '../../../vendor/auth/jwt.js'
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
       id:'',//小区id
       list:[],//小区图片
       arr: {}, //小区展示信息
				titel: [
					'简介', '公告'
				],
				Notice: [], // 公告数据
				detailedAddress: '', //小区详细地址
				idx: 0,
        isLoding: false,
        code:0
  },

   

  // 去论坛
  goforum() {
     wx.navigateTo({
      url: `/pages/communityForum/forumlists/forumlists?id=${this.data.id}`
    })
  
  },
  //查看小区位置
  navigation(){
    let latitude = Number(this.data.arr.lat)
    let longitude = Number(this.data.arr.lng) 
    wx.openLocation({
      latitude,
      longitude,
      scale: 18
    })
  },
// 查看详情
godils(e) {
  let id = e.currentTarget.dataset.item.id
  village.Noticeshow({
    data: {
      id: id
    },
    fail: () => {
      wx.showToast({
        title: '网络错误',
        icon: 'none'
      })
    },
    success: (res) => {
      if (res.statusCode != 200) return
      if (res.data.code != 200) return
      let content = {title:res.data.data.title,content:res.data.data.content}
      app.redInfo = content
      wx.navigateTo({
        url: '/pages/InformationDetails/InformationDetails'
      })
    }
  })
},

  // 点击
  add(e) {
    let index = e.currentTarget.dataset.index
    this.setData({
      idx : index
    })
  },
 
  // 小区公告
  noticeData() {
    village.Notice({
      data: {
        village_id: this.data.id
      },
      fail: () => {
        wx.showToast({
          title: '网络错误',
          icon: 'none'
        })
      },
      success: (res) => {
        if (res.statusCode != 200) return
        if (res.data.code != 200) return
        let data = res.data.data.data
        this.setData({
          Notice: data
        })
      }
    })
  },

   // 小区展示信息
   Information() {
    this.setData({
      isLoding:true
    })
    village.displayInformation({
      data: {
        id: this.data.id
      },
      fail: () => {
        this.setData({
          isLoding:false
        })
        wx.showToast({
          title: '网络错误',
          icon: 'none'
        })
      },
      success: (res) => {
        this.setData({
          isLoding:false
        })
        if (res.statusCode != 200) return
        if (res.data.code != 200) return
        let data = res.data.data
        let list = []
         data.album.map(item => {
          list.push(item.url)
        })
        if(list.length==0){
          list =  ['https://oss.kuaitongkeji.com/static/img/app/forum/timg.jpg']//没有小区图片的默认图
        }
        this.setData({
          list:list,
          arr:data,
          detailedAddress: data.address + data.address_name,// 小区详细地址
          code:res.data.code
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id:options.id
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
   this.Information()
   this.noticeData()
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