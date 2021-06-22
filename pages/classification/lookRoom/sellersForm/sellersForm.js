// pages/classification/lookRoom/rentalForm/rentalForm.js
import route from '../../../../vendor/request/routes.js'
import home from '../../../../vendor/home/home.js'
import jwt from '../../../../vendor/auth/jwt.js'
import user from '../../../../vendor/user/userDetails.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: '', //标题
    addDetails: '', //详细地址
    lgt: '', //经度
    lat: '', //纬度
    houseType: false, //户型
    listType: [], //户型数据
    defaultType: [], //户型默认
    Isfloor: false, //楼层
    listFloor: [], //楼层数据
    defaultFloor: [], //楼层默认
    floor: '', //选择楼层
    totalFloor: '', //选择总楼层
    fitmentShow: false, //装修
    fitmentList: [{
      value: 'well',
      label: '精装',
      extra: 0
    }, {
      value: 'simple',
      label: '简装',
      extra: 1
    }, {
      value: 'low',
      label: '清水房',
      extra: 2
    }], //装修数据
    defaultFitment: [], //装修默认
    celFit: "", //选择装修
    elevatorShow: false, //电梯
    elevatorList: [{
      value: 0,
      label: '无'
    }, {
      value: 1,
      label: '有'
    }], //电梯数据
    defaultElevator: [], //电梯默认
    rentNum: '', //售价
    image: [], //图片数据
    isLoding: false,
    coverImg: '', //封面图片
    flag: false,
    textvalue: '', //房屋简介
    formlist: [{
        titel: '小区名字及地址',
        value: "",
        disabled: true,
        style: 'text',
        placeholder: '请选择小区'
      },
      {
        titel: '户型',
        value: "",
        disabled: true,
        style: 'text',
        placeholder: '请选择'
      },
      {
        titel: '楼层',
        value: "",
        disabled: true,
        style: 'text',
        placeholder: '请选择'
      },
      {
        titel: '装修',
        value: "",
        disabled: true,
        style: 'text',
        placeholder: '请选择'
      },
      {
        titel: '面积',
        value: "",
        style: 'number',
        placeholder: '请填写'
      },
      {
        titel: '电梯',
        value: "",
        disabled: true,
        style: 'text',
        placeholder: '请选择'
      },
    ],
    username: '',
    tel: ''

  },


    // 提交
    subunit(){
		  let faceimg = this.data.coverImg
		   if(!this.data.coverImg){
			   faceimg = this.data.image[0]
		   }
		   wx.showLoading({
		   	title:'提交中'
       })
		 home.releaseSellers({
			 data:{
				 // 必传
				 title: this.data.value,
				 room:this.data.defaultType[0] ,
				 hall:this.data.defaultType[1] ,
				 bathroom:this.data.defaultType[2],
				 area:this.data.formlist[4].value,
				 ele:this.data.defaultElevator[0],
				 floor:this.data.floor,
				 total_floor:this.data.totalFloor,
				 zx:this.data.celFit,
				 sale_price:this.data.rentNum,
				 album:this.data.image,
				 address_name:this.data.formlist[0].value,
				 desc:this.data.textvalue,
				 tel:this.data.tel,
				 contact_name:this.data.username,
         address:this.data.addDetails,
				  lng:this.data.lgt,
				  lat:this.data.lat,
				  cover:faceimg
			 },
			 fail: () => {
				 wx.hideLoading()
				 wx.showToast({
				 	title: '网络错误',
				 	icon: 'none'
				 })
			 },
			 success:(res) => {
				  wx.hideLoading()
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
				  wx.showToast({
				  	title: res.data.msg,
				  	icon: 'none',
					duration:3000
				  })
				  let settime = setTimeout(() =>{
					 wx.navigateBack({
					 	delta:1
					 })
					 clearTimeout(settime)
				  },3000)
					  
				 }
		 })  
	   },
  // 选择
  fillIn(e) {
    let index = e.currentTarget.dataset.index
    if (index == 0) {
      this.location()
    }
    if (index == 1) {
      this.setData({
        houseType: true
      })
    }
    if (index == 2) {
      this.setData({
        Isfloor: true
      })
    }
    if (index == 3) {
      this.setData({
        fitmentShow: true
      })
    }
    if (index == 5) {
      this.setData({
        elevatorShow: true
      })
    }
  },
     //判断
     iSfill(){
      if(!this.data.value){
        wx.showToast({
          title:"请输入标题",
          icon:"none"
        })
        return;		
      } 
      if(!this.data.formlist[0].value) {
         wx.showToast({
          title:"请选择小区",
          icon:"none"
         })
         return;
          } 
      if(this.data.defaultType.length == 0){
         wx.showToast({
          title:"请选择户型",
          icon:"none"
         })
         return;
      }
      if(!this.data.floor){
         wx.showToast({
          title:"请选择楼层",
          icon:"none"
         })
         return;
      }
      if(!this.data.celFit){
         wx.showToast({
          title:"请选择装修",
          icon:"none"
         })
         return;
      }
      if(!this.data.formlist[4].value){
         wx.showToast({
          title:"请填写面积",
          icon:"none"
         })
         return;
      }
      if( this.data.defaultElevator.length == 0){
         wx.showToast({
          title:"请选择是否有电梯",
          icon:"none"
         })
         return;
      }
      if( !this.data.rentNum){
         wx.showToast({
          title:"请填写售价",
          icon:"none"
         })
         return;
      }
      if( this.data.image.length == 0){
         wx.showToast({
          title:"请上传房屋照片",
          icon:"none"
         })
         return;
      }
      if( !this.data.textvalue){
         wx.showToast({
          title:"请填写房屋简介",
          icon:"none"
         })
         return;
      } 
      this.subunit()
    },
   //房屋简介
   OnText(e){
    this.setData({
      textvalue : e.detail.value
    })
   },
  //删除图片
	delImage(e){
    let index = e.currentTarget.dataset.index
    this.data.image.splice(index,1)
    this.setData({
      image : this.data.image
    })
	},
  //删除封面
  clarImg(){
   this.setData({
    coverImg : ''
   })
  },
   //选择图片
   selPhoto(){
    this.setData({
      flag : false
    })
    this.succ()
  },
  //选择封面
  celCover(){
    this.setData({
      flag : true
    })
    this.succ()
  },
  //获取租金
  Onrent(e) {
    let val = e.detail.value
    this.setData({
      rentNum: val
    })
  },
  //获取面积
  Onchange(e) {
    let index = e.currentTarget.dataset.index
    if (index !== 4) return;
    let val = e.detail.value
    let value = 'formlist[4].value'
    this.setData({
      [value]: val
    })
  },
 
  //确定电梯选择
  confirmElevator(e) {
    let val = e.detail.value
    let value = 'formlist[5].value'
    let Default = []
    Default.push(val.value)
    this.setData({
      [value]: val.label,
      defaultElevator: Default,
      elevatorShow: false
    })
  },
  // 关闭电梯选择
  onEle() {
    this.setData({
      elevatorShow: false
    })
  },
  // 选择装修
  confirmFitment(e) {
    let val = e.detail.value
    let value = 'formlist[3].value'
    this.setData({
      [value]: val.label,
      celFit: val.value,
      fitmentShow: false
    })
  },
  // 关闭装修选择
  onfitment() {
    this.setData({
      fitmentShow: false
    })
  },
  // 确定户型选择
  onConfirm(e) {
    let val = e.detail.value
    let Default = []
    let value = ''
    let text = 'formlist[1].value'
    val.map(item => {
      Default.push(item.value)
      value += item.label
    })
    this.setData({
      defaultType: Default,
      [text]: value,
      houseType: false
    })
  },
  //关闭户型选择
  onClose() {
    this.setData({
      houseType: false
    })
  },
  // 确定楼层选择
  onCfloor(e) {
    let msg = e.detail.value
    let floor = msg[0].value
    let allFloor = msg[1].value
    let val = 'formlist[2].value'
    this.setData({
      [val]: floor + '/' + allFloor,
      floor: floor,
      totalFloor: allFloor,
      Isfloor: false
    })
  },
  //关闭楼层选择
  onfloor() {
    this.setData({
      Isfloor: false
    })
  },
  // 楼层
  flChange(e) {
    const {
      picker,
      value,
      index
    } = e.detail
    if (index == 1) return;
    let idx = value[0].value
    let arr = this.data.listFloor
    arr = arr[1].values.slice(idx - 1, 99)
    picker.setColumnValues(1, arr)
  },
  // 定位
  location() {
    let that = this
    wx.chooseLocation({
      success: function (res) {
        let name = 'formlist[0].value'
        that.setData({
          [name]: res.name,
          addDetails: res.address,
          lgt: res.longitude.toFixed(6),
          lat: res.latitude.toFixed(6) //纬度
        })
      }
    });
  },
  //获取标题
  Onvalue(e) {
    this.setData({
      value: e.detail.value
    })
  },
  // 获取用户资料
  // 判断是否登录
  loadUserData() {
    jwt.doOnlyTokenValid({
      showModal: true,
      keepSuccess: false,
      success: () => {
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
            if (!Users.id_card_no) {
							wx.showModal({
								content: '请完善您的身份信息',
								success: function(res) {
									if (res.confirm) {
										wx.navigateTo({
											url: '/pages/userinfo/realInformation/realInformation'
										})
									} else if (res.cancel) {
										wx.navigateBack({
											delta: 1
										})
									}
								}
							})
							return;
						}
            this.setData({
              username: Users.username,
              tel: Users.tel
            })
          },
        })
      },
      fail: () => {
      	wx.navigateBack({
          delta: 1
        })
      }
    })
  },
  // 图片
  succ(){
    wx.chooseImage({
      extension: ['jpg', 'jpeg', 'png', 'gif'],
      success: (chooseImageRes) => {
        const files = chooseImageRes.tempFilePaths;
       this.setData({
         isLoding : true
       })
        let that = this;
        if (files.length == 0) return;
        let func = [];
        files.forEach((item) => {
          func.push(that.upload(item));
        });
    
        Promise.all(func).then((res) => {
          that.setData({
            isLoding : false
          })
        }).catch((err) => {
          that.setData({
            isLoding : false
          })
          wx.showModal({
            title: "上传文件出错:" + err,
          })
        })
      }
    })  
   },
   upload(fileItem) {
     let that = this;
     return new Promise((res, rej) => {
       wx.uploadFile({
         url: route.services.file.upload,
         filePath: fileItem,
         name: 'file',
         fail: (err) => {
           rej('网络出错');
         },
         success: (val) => {
           if (val.statusCode != 200) {
             rej(val.statusCode);
             return;
           }
   
           let jres = JSON.parse(val.data);
   
           if (jres.code != 200) {
             rej(jres.msg);
             return;
           }
         if(that.data.flag == false){
           that.data.image.push(jres.data.url)
           that.setData({
            image :   that.data.image
           })
         }
         if(that.data.flag == true) {
            that.setData({
              coverImg : jres.data.url
            })
         }
           res(jres);
         }
       })
     })
   },
  all() {
    // 户型数据
    let lists = [{
        values: [],
        className: 'column1',
      },
      {
        values: [],
        className: 'column2',
      },
      {
        values: [],
        className: 'column3',
      },
    ]
    for (var i = 1; i < 11; i++) {
      let room = {
        value: i,
        label: i + '室'
      }
      let hall = {
        value: i,
        label: i + '厅'
      }
      let bathroom = {
        value: i,
        label: i + '卫'
      }
      lists[0].values.push(room)
      lists[1].values.push(hall)
      lists[2].values.push(bathroom)
    }
    this.setData({
      listType: lists
    })
    // 楼层数据
    let foortost = [{
        values: [],
        className: 'column1',
      },
      {
        values: [],
        className: 'column2',
      }
    ]
    for (var i = 1; i < 100; i++) {
      let floor = {
        value: i,
        label: i + '层',
      }
      let allFloor = {
        value: i,
        label: '共' + i + '层'
      }
      foortost[0].values.push(floor)
      foortost[1].values.push(allFloor)
    }
    this.setData({
      listFloor: foortost
    })
  },
    //获取联系人输入框
    getname(e){
      this.setData({
        username : e.detail.value
      })
     },
  
     //获取电话输入框
     gettel(e){
      this.setData({
        tel : e.detail.value
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
    this.all()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.loadUserData()
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