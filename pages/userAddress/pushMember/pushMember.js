// pages/userAddress/pushMember/pushMember.js
import address from '../../../vendor/address/address.js'
var timestamp = Date.parse(new Date());
var date = new Date(timestamp);
Page({

  /**
   * 页面的初始数据
   */
  data: {
    timeList:[
      {label:'永久',
      id:0},
        { label:'临时',
      id:1}],
      timeshow:false, //是否显示选择时间
      timenum:0,//默认永久
    show:false,//选择时间
    minDate: new Date().getTime(),
    maxDate: new Date(2030, 10, 1).getTime(),
    currentDate: new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime(),
    isYse:false,//选择打勾
    types:[
      {id:3,label:'租户'},
      {id:2,label:'家庭成员'}
    ],//用户类型
    showType:false,//是否显示用户类型
    typeTet:'', //选择的类型
    typeId:'',//选择类型的id
    time:'',//有效时间
    reValue:'',//备注
    addressid:'',//用户地址id
    locdata: [{
        label: '姓名',
        value: '',
        placeholder: '请输入姓名',
        type: 'text'
      },
      {
        label: '手机号码',
        value: '',
        placeholder: '请输入手机号码',
        type: 'number'
      }
    ],
    result: {},
  },
  affirm(){
    if(!this.data.typeId){
     wx.showToast({
       title:'选择用户类型',
      icon:"none"
     })
     return;
    }
      wx.showModal({
        content:'您确定添加该用户吗',
        success:(res) => {
        if(res.cancel){
        }
        if(res.confirm){
        let allow = 0
        if(this.data.isYse==true){
          allow = 1
        }
        if(this.data.isYse==false){
          allow = 0
        }
        wx.showLoading({
          title:'加载中'
        })
        address.pushMember({
          data:{
            id:this.data.addressid,
            member_id:this.data.result.id,
            allow_edit_member:allow,
            type:this.data.typeId,
            valid_type:this.data.timenum,
            valid_end:this.data.time,
            host_remark:this.data.reValue
          },
          fail: () => {
            wx.hideLoading()
            wx.showToast({
              title: '网络错误',
              icon: 'none',
              duration:4000
            })
          },
          success: (res) => {
            wx.hideLoading()
            // console.log(res);
            if (res.statusCode != 200) {
              wx.showToast({
                title: '网络出错了',
                icon: 'none',
                duration:4000
              })
              return;
            }
            if (res.data.code != 200) {
              wx.showToast({
                title: res.data.msg,
                icon: 'none',
                duration:4000
              })
              return;
            }
            wx.showToast({
              title:res.data.msg
            })
            let val = 'locdata[0].value'
            let value = 'locdata[1].value'
            this.setData({
              [val] : '',
              [value] : '',
              result : {}
            }) 
          }
        })
        }
        
        }
      })
    
  },
    //获取备注
    areaChange(e){
    this.setData({
      reValue : e.detail.value
    })
    },
  	//选择用户类型	
    selType(e){
      let item = e.currentTarget.dataset.item
      this.setData({
        showType : false,
        typeTet : item.label,
        typeId :  item.id
      })
    },
  //打开住户类型
  celUserType(){
    this.setData({
      showType : !this.data.showType,
      timeshow : false
    })
  },
  //选择时间
  confirm(e){
   var n = e.detail
   var date = new Date(n)
   var Y = date.getFullYear();
   var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
   var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
   let time = Y + '-' + M + '-' + D 
   this.setData({
    time : time,
    show : false
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
	//时间选择
  selTime(e){
    let item = e.currentTarget.dataset.item
    this.setData({
      timeshow : false,
      timenum : item.id,
    })
    if(item.id == 0){
      this.setData({
        time : item.label
      })
    }
    if( item.id == 1){
      this.setData({
        show : true
      })
    }
  },
//打开时间
showTime(){
  this.setData({
    timeshow : !this.data.timeshow,
    showType : false
  })
},
// 点击打钩选择
addYse(){
  this.setData({
    isYse : !this.data.isYse
  })
},
  // 搜索
  search(){
    if (this.data.locdata[0].value == '') {
      wx.showToast({
        title: '请输入被搜索人姓名',
        icon: "none"
      })
      return;
    }
    if (this.data.locdata[1].value == '') {
      wx.showToast({
        title: '请输入被搜索人电话',
        icon: "none"
      })
      return;
    }
    wx.showLoading({
      title:'加载中'
    })
    address.findUser({
      data:{
        username:this.data.locdata[0].value,
        tel:this.data.locdata[1].value
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
            duration:4000
          })
          return;
        }
        if (res.data.code != 200) {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration:4000
          })
          return;
        }
        let data = res.data.data
        this.setData({
          result : data
        })
      }	
    })
  },
  // 获取输入框的值
  Onchange(e){
    let index = e.currentTarget.dataset.index
    if(index==0){
      let name = 'locdata[0].value'
      this.setData({
        [name] : e.detail.value
      })
    }
    if(index == 1){
      let name = 'locdata[1].value'
      this.setData({
        [name] : e.detail.value
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      addressid : options.addressid
    })
    if(options.typeid==3){
      this.setData({
        types : [ {id:3,label:'租户'}]
      })
    }
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