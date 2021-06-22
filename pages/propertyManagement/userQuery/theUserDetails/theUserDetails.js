// pages/propertyManagement/userQuery/theUserDetails/theUserDetails.js
import home from '../../../../vendor/home/home.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    code:0,
    avatar:'',//头像
    displayBox: [{
        title: '姓名',
        content: ''
      },
      {
        title: '地址',
        content: ''
      },
      {
        title: '身份类型',
        content: ''
      },
      {
        title: '有效期限',
        content: ''
      },
      {
        title: '入住日期',
        content: ''
      },
      {
        title: '截止日期',
        content: ''
      }
    ]
  },

  getData(id){
    wx.showLoading({
      title:'加载中'
    })
    home.ResidentD({
      data:{
        id:id
      },
      fail : () => {
        wx.hideLoading()
        wx.showToast({
          title: '网络错误',
          icon: "none"
        })
      },
      success : (res) => {
        wx.hideLoading()
        if (res.statusCode != 200) {
          wx.showToast({
            title: '网络出错了',
            icon: "none"
          })
          return;
        }
        if(res.data.code != 200) {
        wx.showToast({
          title: res.data.msg,
          icon: "none"
        })
        return;  
        }
        this.code = res.data.code
        let data = res.data.data
          switch(data.type){
            case 1:
            data.type = '户主'
            break;
            case 2:
            data.type = '家庭成员'
            break;
            case 3:
            data.type = '租户'
          }
          if(data.valid_begin){
             data.valid_begin = data.valid_begin.slice(0,16)
          }else{
            data.valid_begin = '暂无'
        }
        if(data.valid_end){
          data.valid_end = data.valid_end.slice(0,16)
        }else{
         data.valid_end = '暂无'
        }
     
        switch(data.valid_type){
          case 0:
            this.setData({
              ['displayBox[3].content'] : "永久"
            })
          break;
          case 1:
            this.setData({
              ['displayBox[3].content'] : "临时"
            })
          break;
        }
        this.setData({
          code: res.data.code,
          ['displayBox[0].content'] : data.own_user.username,
          ['displayBox[1].content'] : '' + data.own_building.name + data.own_apartment.name + data.own_floor.name + data.own_room.name,
          ['displayBox[2].content'] : data.type,
          ['displayBox[4].content'] : data.valid_begin,
          ['displayBox[5].content'] : data.valid_end,
          avatar : data.own_user.avatar
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData(options.id)
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