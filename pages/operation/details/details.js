// pages/operation/details/details.js
import home from '../../../vendor/home/home.js'
var timestamp = Date.parse(new Date());
var date = new Date(timestamp);
Page({

  /**
   * 页面的初始数据
   */
  data: {
    text: '', //结果
    remarks: '', //备注
    textvalue: '', //结果文本域
    valuetime: '', //二维码有效时间
    show: false,
    invalid_at: '', //传的时间
    redIMG: '', //图片
    minHour: 10,
    maxHour: 20,
    minDate: new Date().getTime(),
    maxDate: new Date(2030, 10, 1).getTime(),
    currentDate: new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59).getTime(),
    locadata: [{
        titel: '姓名',
        value: ''
      },
      {
        titel: '手机号码',
        value: ''
      },
      {
        titel: '申请时间',
        value: ''
      },
      {
        titel: '地址',
        value: ''
      },
    ],
    id: '', //传过来的id
    deful: [date.getFullYear(), date.getMonth(), date.getDate(), 23, 59]
  },

  // 不通过
  nopass(){
    this.operate(3,'')
  },
  //  通过
  pass() {
    this.operate(2,this.data.invalid_at)
  },
  // 结果回复
  Onchange(e){
   this.setData({
    textvalue : e.detail.value
   })
  },
  //  操作
  operate(status, invalid) {
    wx.showLoading({
      title: '加载中...',
    })
    home.handlevisit({
      data: {
        id: this.data.id,
        verify_status: status,
        verify_msg: this.data.textvalue,
        invalid_at: invalid
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
        });
        const time = setTimeout(() => {
          this.getData(this.data.id)
          clearTimeout(time)
        }, 1500)
      }
    })

  },
  // 选择时间
  confirm(e) {
    var n = e.detail
    var date = new Date(n)
    var Y = date.getFullYear();
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    var h = date.getHours();
    var m = date.getMinutes();
    let time = Y + '年' + M + '月' + D + '日' + ' ' + h + ':' + m
    this.setData({
      valuetime: time,
      show: false,
      invalid_at: Y + '-' + M + '-' + D + ' ' + h + ':' + m + ':' + '00',
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
  // 打开时间选择
  opentime() {
    this.setData({
      show: true
    })
  },
  // 数据
  getData(id) {
    wx.showLoading({
      title: '加载中...'
    })
    home.comvisitdeil({
      data: {
        id: id
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
        if (res.statusCode != 200) return;

        if (res.data.code != 200) return;

        var Y = date.getFullYear();
        //获取月份  
        var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
        //获取当日日期 
        var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
        console.log("当前时间：" + Y + '年' + M + '月' + D + '日');

        // console.log(res.data.data);
        let data = res.data.data
        let username = 'locadata[0].value'
        let tel = 'locadata[1].value'
        let created = 'locadata[2].value'
        this.setData({
          valuetime: Y + '年' + M + '月' + D + '日' + '23:59',
          invalid_at: Y + '-' + M + '-' + D + ' ' + '23:59:00',
          [username]: data.own_visitor.username,
          [tel]: data.own_visitor.tel.slice(0, 3) + '****' + data.own_visitor.tel.slice(7, 11),
          [created]: data.created_at.slice(0, 16),
          text: data.verify_text,
          remarks: data.visitor_remark ? data.visitor_remark : '',
          redIMG: data.ext_img
        })
        if (data.own_village) {
          let value = 'locadata[3].value'
          this.setData({
            [value]: '' + data.own_village.name + data.own_building.name + data.own_apartment.name + data.own_floor.name + data.own_room.room_number
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
      id : options.id
    })
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