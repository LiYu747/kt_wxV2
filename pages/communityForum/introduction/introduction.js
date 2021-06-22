// pages/communityForum/introduction/introduction.js
import village from '../../../vendor/village/village.js'
import jwt from '../../../vendor/auth/jwt.js'
import cache from '../../../vendor/cache/cache'
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
        code:0,
        page:1,
        userLogin:false
  },

   

  // 去论坛
  goforum() {
    if (this.data.userLogin == false) {
      this.loadUserData()
      return;
    }
    if (this.data.arr.tribune_state == 0) {
      wx.showToast({
        title: "暂时禁止发布和访问",
        icon: "none",
        duration: 3000
      })
      return;
    }
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
    if (this.data.userLogin == false) {
      this.loadUserData()
      return;
    }
    this.setData({
      idx : index
    })
    if (index == 1) {
      this.noticeData()
    }
  },
 
  // 小区公告
  noticeData() {
    village.Notice({
      data: {
        village_id: this.data.id,
        page: this.data.page,
        pageSize: 3
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
        let data = res.data.data.info
        let img = ['https://oss.kuaitongkeji.com/upload/2020/12/15/AY0xTVMZBzNuJ0acHphXphi4gewrdyJeuBoypUCH.jpeg']
        this.setData({
          list:!data.album  || data.album.length == 0  ? img :data.album,
          arr:data,
          detailedAddress: data.address + data.address_name,// 小区详细地址
          code:res.data.code
        })
      }
    })
  },

  	// 判断是否登录
    loadUserData() {
      jwt.doOnlyTokenValid({
        showModal: true,
        keepSuccess: false,
        success: () => {

        },
        fail: () => {
          
        }
      })
    },
   
  //查看图片
  lookImg(e){
    let index = e.currentTarget.dataset.index
    // 预览图片
     wx.previewImage({
       urls:this.data.list, 
       current: this.data.list[index],
       indicator:"default", 
     }); 
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
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (cache.get('jwt')) {
      this.setData({
        userLogin : true
      })
    } else {
      this.setData({
        userLogin : false
      })
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