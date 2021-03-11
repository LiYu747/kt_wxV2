// pages/userAddress/addediting/ADDediting.js
import address from '../../../vendor/address/address.js'
import cache from '../../../vendor/cache/cache.js'
import user from '../../../vendor/user/userDetails.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    parameter: [{
        value: '',
        label: '姓名',
        disabled: true
      },
      {
        value: '',
        label: '手机号码',
        disabled: true
      },
      {
        value: '',
        label: '入住身份',
        disabled: true
      },
      {
        value: '',
        label: '小区',
        disabled: true
      },
      {
        value: '',
        label: '楼栋号',
        disabled: true
      },
    ],
    Islimits: '', //是否有权限添加,为1可添加
    Members: [], //所有成员 
    typeid: '', //用户类型
    isLoding: false
  },
  
  	// 用户成员详情信息
    memberInfo(e) {
      if(this.data.Islimits==0) return;
      let item = e.currentTarget.dataset.item
      wx.navigateTo({
        url: '/pages/userAddress/memberInfo/memberInfo?id=' + item.id
      })
    },
  // 添加成员
  pushMember() {
    wx.navigateTo({
      url: '/pages/userAddress/pushMember/pushMember?addressid=' + this.data.id + '&typeid=' + this.data.typeid
    })
  },
  //查看住所内的所有成员
  allMembers() {
    address.lookMember({
      data: {
        id: this.data.id
      },
      fail: () => {
        wx.showToast({
          title: '网络错误',
          icon: 'none'
        })
      },
      success: (res) => {
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
        }
        let data = res.data.data
        this.setData({
          Members : data
        })
      }
    })
  },
  // 用户居住信息
  getData() {
    this.setData({
      isLoding : true
    })
    address.listdetails({
      data: {
        id: this.data.id
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
        }
        let data = res.data.data
        let name = 'parameter[3].value'
        let value = 'parameter[4].value'
        let typeval = 'parameter[2].value'
        let userinfo = ''
        if (data.type == 1) {
          userinfo = '户主'
        }
        if (data.type == 2) {
          userinfo = '家庭成员'
        }
        if (data.type == 3) {
          userinfo = '租户'
        }
        this.setData({
          Islimits :  data.allow_edit_member,
          typeid : data.type,
          [name] :  data.own_village.name,
          [value] :  data.own_building.name + data.own_apartment.name + data.own_floor.name + data.own_room.room_number,
          [typeval] : userinfo
        })
      }
    })
  },
  	// 获取用户资料
    Userdata() {
      user.userDeta({
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
          let Users = res.data.data
          let username = 'parameter[0].value'
          let tel = 'parameter[1].value'
          this.setData({
            [username] : Users.username,
            [tel] : Users.tel.slice(0, 4) + '****' + Users.tel.slice(7, 11)
          })
        },
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
     this.getData()
     this.Userdata()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  this.allMembers()
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