// pages/userAddress/memberInfo/memberInfo.js
import address from '../../../vendor/address/address.js'
var timestamp = Date.parse(new Date());
var date = new Date(timestamp);
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '', //成员id
    time: '', //有效时间
    value: '', //备注
    jurShow: false,
    jurId: '', //权限id
    jurList: [{
        label: '允许',
        id: 1
      },
      {
        label: '不允许',
        id: 0
      }
    ],
    timeList: [{
        label: '永久',
        id: 0
      },
      {
        label: '临时',
        id: 1
      }
    ],
    minDate: new Date().getTime(),
    maxDate: new Date(2030, 10, 1).getTime(),
    currentDate: new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime(),
    tiemShow: false,
    timeId: '', // 选择的时间
    show: false,
    locdata: [{
        label: '姓名',
        value: ''
      },
      {
        label: '手机号码',
        value: ''
      },
      {
        label: '是否允许添加其他成员',
        value: ''
      }
    ],
  },


   //删除成员
   delMember(){
    wx.showModal({
      content:'您确定要删除该成员吗',
      success:(res) => {
        if(res.confirm){
          wx.showLoading({
            title:'加载中'
          })
          address.deleteMember({
            data:{id:this.data.id},
            fail: () => {
              wx.hideLoading()
              wx.showToast({
                title: '网络错误',
                icon: 'none'
              })
            },
            success: (res) => {
              wx.hideLoading()
              if(res.statusCode != 200){
                wx.showToast({
                  title: '网络出错了',
                  icon: 'none',
                  duration:2000
                })
                return;
              }
              if (res.data.code != 200) {
                wx.showToast({
                  title: res.data.msg,
                  icon: 'none',
                  duration:2000
                })
                return;
              }
              wx.navigateBack({
                delta:1
              })
            }
          })
        }
      }
    })
  },
  // 保存修改信息信息
  Submit() {
    wx.showLoading({
      title: '加载中'
    })
    address.updateMember({
      data: {
        id: this.data.id,
        allow_edit_member: this.data.jurId,
        valid_type: this.data.timeId,
        valid_end: this.data.time,
        host_remark: this.data.value
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
            title: '网络出错了',
            icon: 'none',
            duration: 2000
          })
          return;
        }
        if (res.data.code != 200) {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 2000
          })
          return;
        }
        wx.showToast({
          title: res.data.msg
        })
      }
    })
  },
  // 获取备注
  Onchange(e) {
    this.setData({
      value: e.detail.value
    })
  },
  //选择时间
  confirm(e) {
    var n = e.detail
    var date = new Date(n)
    var Y = date.getFullYear();
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    let time = Y + '-' + M + '-' + D
    this.setData({
      time: time,
      show: false
    })
  },
  // 关闭时间选择
  cancel() {
    this.onClose()
  },
  onClose() {
    this.setData({
      show: false
    })
  },
  // 打开时间
  seltime(e) {
    let item = e.currentTarget.dataset.item
    this.setData({
      timeId: item.id
    })
    if (item.id == 0) {
      this.setData({
        time: item.label
      })
    }
    if (item.id == 1) {
      this.setData({
        show: true,
      })
      if (this.data.time != '永久') {
        var time = this.data.time + ' 00:00:00';
        var repTime = time.replace(/-/g, '/'); //用正则主转换
        var timeTamp = Date.parse(repTime);
        this.setData({
          currentDate: timeTamp
        })
      }
    }
  },
  //选择时间
  celTime() {
    this.setData({
      tiemShow: !this.data.tiemShow,
      jurShow: false
    })
  },
  // 选择权限
  seljur(e) {
    let item = e.currentTarget.dataset.item
    let label = 'locdata[2].value'
    this.setData({
      jurShow: false,
      [label]: item.label,
      jurId: item.id
    })
  },
  // 打开权限
  addItem(e) {
    let index = e.currentTarget.dataset.index
    if (index == 2) {
      this.setData({
        jurShow: !this.data.jurShow,
        tiemShow: false
      })
    }
  },
  // 成员信息
  getMdetails() {
    wx.showLoading({
      title: '加载中'
    })
    address.memberDetails({
      data: {
        id: this.data.id
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
            title: '网络出错了',
            icon: 'none',
            duration: 2000
          })
          return;
        }
        if (res.data.code != 200) {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 2000
          })
          return;
        }
        let data = res.data.data
        let username = 'locdata[0].value'
        let tel = 'locdata[1].value'
        let member = 'locdata[2].value'
        this.setData({
          [username]: data.own_user.username,
          [tel]: data.own_user.tel,
          jurId: data.allow_edit_member,
          timeId: data.valid_type,
          value: data.host_remark
        })
        let msg = ''
        if (data.allow_edit_member == 0) {
          msg = '不允许'
        }
        if (data.allow_edit_member == 1) {
          msg = '允许'
        }
        this.setData({
          [member]: msg,
        })
        if (data.valid_type == 0) {
          this.setData({
            time: '永久'
          })
        }
        if (data.valid_type == 1) {
          this.setData({
            time: data.valid_end.slice(0, 10)
          })
        }
      }
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
    this.getMdetails()
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