// pages/propertyManagement/CheckToSee/seeDetails/seeDetails.js
import home from '../../../../vendor/home/home.js'
const app = getApp()
var timestamp = Date.parse(new Date());
var date = new Date(timestamp);
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    state: '', //处理状态
    stateCode:'',//处理状态码
    remark: '', //备注
    result: '', //结果
    files:[],//附件
    verify_status: '', //选择结果
    locdata: [{
        label: '姓名',
        value: ''
      },
      {
        label: '电话',
        value: ''
      },
      {
        label: '身份证号',
        value: ''
      },
      {
        label: '地址',
        value: ''
      },
      {
        label: '时间',
        value: ''
      }
    ],
    radio:'0',
    minHour: 10,
    maxHour: 20,
    minDate: new Date().getTime(),
    maxDate: new Date(2030, 10, 1).getTime(),
    currentDate: new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(),date.getMinutes()).getTime(),
    timeshow: false,
    isStarend: 0, //判断是选择开始时间还是结束，开始是0，结束是1.
    valid_begin: '',
    valid_end: ''
  },
   

   //时间确定选择
   confirm(e){
    var date = new Date(e.detail)
    var Y = date.getFullYear();
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    var h = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
    var m = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
    let time = Y + '-' + M + '-' + D + ' ' + h + ':' + m + ':' + '00'
    if(this.data.isStarend == 0){
      this.setData({
        valid_begin : time,
      })
      this.onClose()
      return;
    }
    if(this.data.isStarend == 1){
      let tampLogin = new Date(time.replace(/-/g,'/')).getTime() - new Date(this.data.valid_begin.replace(/-/g,'/')).getTime();
       if(tampLogin<=0){
        wx.showToast({
          title: '必须大于起始时间',
          icon: "none"
        })
        return;
       }
      this.setData({
        valid_end : time
      })
      this.onClose()
    }
   },
   //选择开始时间
   cleStantime(){
    this.setData({
      timeshow: true,
      isStarend : 0
    })
   },
  //选择截止时间
  cleEndtime(){
    if (this.data.valid_begin == '') {
      wx.showToast({
        title: '请先选择开始时间',
        icon: "none",
      })
      return;
    }
    this.setData({
      timeshow: true,
      isStarend : 1
    })
  },
   // 关闭时间选择
   cancel() {
    this.onClose()
  },
  onClose() {
    this.setData({
      timeshow: false
    })
  },
  onChange(event) {
    this.setData({
      radio: event.detail,
    });
  },
    
  // 通过
  pass() {
    if(this.data.radio == 1){
      if(!this.data.valid_begin){
        wx.showToast({
          title:"请选择开始时间",
          icon:"none"
        })
        return;
      }
      if(!this.data.valid_end){
        wx.showToast({
          title:"请选择结束时间",
          icon:"none"
        })
        return;
      }
    }
    this.setData({
      verify_status : '2'
    })
    this.auditreq('已通过')
  },
  //不通过
  nopass() {
    if(!this.data.result){
      wx.showToast({
        title: "请填写不同意的原因告诉用户",
        icon: "none"
      })
      return;
    }
    this.setData({
      verify_status : '3'
    })
    this.auditreq('未通过')
  },
  //操作请求
  auditreq(text) {
    wx.showLoading({
      title: '加载中'
    })
    if(!this.data.result){
      this.data.result = text
    }
    home.auditRecord({
      data: {
        id: this.data.id,
        verify_status: this.data.verify_status,
        verify_msg: this.data.result,
        valid_type:this.data.radio,
        valid_begin:this.data.valid_begin,
        valid_end:this.data.valid_end
      },
      fail: () => {
        wx.hideLoading()
        wx.showToast({
          title: '网络错误',
          icon: "none"
        })
      },
      success: (res) => {
        wx.hideLoading()
        if (res.statusCode != 200) {
          wx.showToast({
            title: '网络出错了',
            icon: "none"
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
        wx.showToast({
          title: res.data.msg
        })
        const time = setTimeout(() => {
          this.getData()
          app.checkSeePass = text
          clearTimeout(time)
        }, 1500)
      }
    })
  }, 
   //申请结果
   Onareachenge(e){
    this.setData({
      result : e.detail.value
    })
   },
  	// 获取数据
    getData() {
      wx.showLoading({
        title: '加载中'
      })
      home.checkinDetails({
        data: {
          id: this.data.id
        },
        fail: () => {
          wx.hideLoading()
          wx.showToast({
            title: '网络错误',
            icon: "none"
          })
        },
        success: (res) => {
          wx.hideLoading()
          if (res.statusCode != 200) {
            wx.showToast({
              title: '网络出错了',
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
          let data = res.data.data
          switch (data.verify_status) {
            case 1:
              this.setData({
                state : "待审核"
              })
              break;
            case 2:
              this.setData({
                state : "已通过"
              })
              break;
            case 3:
              this.setData({
                state : "未通过"
              })
              break;
          }
          this.setData({
            ['locdata[0].value'] : data.username,
            ['locdata[1].value'] : data.tel.slice(0,3) + '****' + data.tel.slice(7,11),
            ['locdata[2].value' ] : data.id_card_no.slice(0,3) + '***********' + data.id_card_no.slice(14,18),
            ['locdata[3].value'] : data.own_village.name + data.own_building.name + data.own_apartment.name + data.own_floor.name + data.own_room.name,
            ['locdata[4].value'] : data.created_at.slice(0, 16),
            stateCode :  data.verify_status,
            remark : data.user_remark,
            files : data.pics ? data.pics :[],
            result : data.verify_msg
          })
        }
      })
    },

    //查看图片
    lookImg(e){
      let index = e.currentTarget.dataset.index
      // 预览图片
       wx.previewImage({
         urls:this.data.files, 
         current: this.data.files[index],
         indicator:"default", 
       }); 
    },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   this.setData({
     id : options.id
   })
  }, 

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
   this.getData()
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