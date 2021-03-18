// pages/operation/visitRecord/visitRecord.js
import home from '../../../vendor/home/home.js';
import jwt from '../../../vendor/auth/jwt.js';
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    text: '',  //没有有更多提示
    lists: [],  //数据列表
    page: 1,
    ps: 15,
    isLoding: false,  //是否显示loding
    hasMore: true, //是否还有更多
    notInfo: false,
    idx:0
  },
  
  // 去详情
  godetails(e) {
    let item = e.currentTarget.dataset.item
    let index = e.currentTarget.dataset.index
    this.setData({
      idx : index
    })
    wx.navigateTo({
      url: `/pages/operation/details/details?id=${item.id}`
    })
  },
  //获取数据
  getData(){
    this.setData({
      isLoding : true
     })
    home.Visitrecord({
      data: {
        page: this.data.page,
        pageSize: this.data.ps
      },
      fail: () => {
        this.setData({
          isLoding : false
         })
        wx.showToast({
          title: '网络错误',
          icon: 'none'
        })
      },
      success: (res) => {
                        
        this.setData({
          isLoding : false
         })

        if (res.statusCode != 200) return;

        if (res.data.code != 200) return;

        let data = res.data.data;
        if(data.data.length == 0) {
          this.setData({
            notInfo : true
          })
          return;
        }
        data.data.map(item => {
          item.own_visitor.tel = item.own_visitor.tel.slice(0,3) + '****' +item.own_visitor.tel.slice(7,11)
          item.created_at = item.created_at.slice(0,16)
        })
        let lists = this.data.lists
        lists = lists.concat(data.data)
        this.setData({
          page :  data.current_page + 1,
          hasMore : data.next_page_url ? true : false,
          lists : lists
        })
        // console.log(this.lists);
      },
      
    })
  },
  // 判断是否登录
  loadPageData() {
    jwt.doOnlyTokenValid({
      keepSuccess: false,
      showModal: true,
      fail: () => {
        wx.switchTab({
          url: '/pages/index/index'
        })
      },
      success: () => {
        if(this.data.lists.length == 0){
          this.getData()
        }
      }
    })

  },

  // 判断用户是否操作
  useriSdo(){
    if(app.comeToVisit != 0){
      let msg = ''
     if(app.comeToVisit == 2){
       msg = '已同意'
     }
     if(app.comeToVisit == 3){
       msg = '未同意'
     }
      let list =  this.data.lists
      list.map((item,index) =>{
         if(index == this.data.idx) {
           item.verify_text = msg
         }
       })
       this.setData({
         lists : list
       })
   }
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
    this.loadPageData()
    this.useriSdo()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    app.comeToVisit = 0
    
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
    this.setData({
      text : '没有更多了~'
    })
		if (this.data.isLoding == true || this.data.hasMore == false) return;
			this.loadPageData();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})