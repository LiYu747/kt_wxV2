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
     

    //删除
    cleaDel(e){
      let item = e.currentTarget.dataset.item
      let index = e.currentTarget.dataset.index
      wx.showModal({
        content: '您确定要删除该成员',
        success: (res) => {
          if (res.confirm) {
            address.deleteMember({
              data: {
                house_id: item.id
              },
              fail: () => {
                wx.showToast({
                  title: "网络错误",
                  icon: "none"
                })
              },
              success: (res) => {
                if (res.statusCode != 200) {
                  wx.showToast({
                    title: "网络出错了",
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
                this.data.Members.splice(index, 1)
                this.setData({
                  Members :  this.data.Members 
                })
                wx.showToast({
                  title: res.data.msg,
                  icon: "none"
                })
              }
            })
          }
        }
      })
      
    },

  	// 用户成员详情信息
    memberInfo(e) {
      return;
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
  // 用户居住信息
  getData() {
    this.setData({
      isLoding : true
    })
    address.listdetails({
      data: {
        id: this.data.id,
        mates: 1
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
        res.data.data.mates.map(item => {
          switch (item.type) {
            case 1:
              item.type = "户主"
              break;
            case 2:
              item.type = "家庭成员"
              break;
            case 3:
              item.type = "租户"
              break;
          }
          if (item.own_user) {
            item.own_user.tel = item.own_user.tel.slice(0, 4) + '****' + item
              .own_user.tel.slice(7, 11)
          }
          switch (item.valid_type) {
            case 0:
              item.valid_type = "永久"
              break;
          }
          if (item.valid_begin) {
            item.valid_begin = item.valid_begin.slice(0, 11)
          }
          if (item.valid_end) {
            item.valid_end = item.valid_end.slice(0, 11)
          }
        })
        let data = res.data.data.house
        let name = 'parameter[3].value'
        let value = 'parameter[4].value'
        let typeval = 'parameter[2].value'
        let userinfo = ''
        switch(data.type){
          case 1:
          userinfo = '户主'
          break;
          case 2:
          userinfo = '家庭成员'
          break;
          case 3:
          userinfo = '租户'
          break;
        }
        this.setData({
          Islimits :  data.allow_edit_member,
          typeid : data.type,
          [name] :  data.own_village.name,
          [value] :  data.own_building.name + data.own_apartment.name + data.own_floor.name + data.own_room.name,
          [typeval] : userinfo,
          Members : res.data.data.mates
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
    
     this.Userdata()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getData()
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