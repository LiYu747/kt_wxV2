// pages/propertyManagement/propertyhome/propertyhome.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userType: [{
      name: '用户',
      type: 'user',
      url:'/pages/index/index'
    },
    {
      name: '物业',
      type: 'property',
      url: '/pages/propertyManagement/propertyhome/propertyhome'
    },
    {
      name: '快递、外卖',
      type: 'expressage',
      url: '/pages/userMessenger/userhome/userhome'
    }
  ],
  isShowType:false
  },
     

   // 帖子管理
   PostManagement() {
    wx.navigateTo({
      url:'/pages/propertyManagement/postManagement/postManagement'
    })
  },
       //出入记录
		 comeAndGo(){
      wx.navigateTo({
        url:'/pages/propertyManagement/accessToInformation/accessToInformation'
      })
    },
    	 //入住查看
		 CheckTo(){
      wx.navigateTo({
        url:'/pages/propertyManagement/CheckToSee/CheckToSee'
      })
    },
    //用户查询
    goQuery(){
      wx.navigateTo({
        url:"/pages/propertyManagement/userQuery/userQuery"
      })
    },
  //选择用户
  selecType(e){
    let item = e.currentTarget.dataset.item
    if(item.type == 'property') return; 
    wx.reLaunch({
      url: item.url
    })
  },
  //打开用户选择
  celType(){
   this.setData({
    isShowType : !this.data.isShowType
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

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
   this.setData({
    isShowType : false
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