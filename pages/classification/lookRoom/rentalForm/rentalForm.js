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
    id: '',
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
    rentNum: '', //租金
    cash: '', //押金
    cashShow: false, //押金
    cashList: [], //押金数据
    defaultCash: [], //押金默认
    rents_bet: '', //押几
    rents_pay: '', //付几
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
  subunit() {
    let faceimg = this.data.coverImg
    if (!this.data.coverImg) {
      faceimg = this.data.image[0]
    }
    wx.showLoading({
      title: '提交中'
    })
    home.releaseRent({
      data: {
        // 必传
        title: this.data.value,
        room: this.data.defaultType[0],
        hall: this.data.defaultType[1],
        bathroom: this.data.defaultType[2],
        area: this.data.formlist[4].value,
        ele: this.data.defaultElevator[0],
        floor: this.data.floor,
        total_floor: this.data.totalFloor,
        zx: this.data.celFit,
        rents: this.data.rentNum,
        album: this.data.image,
        village: this.data.formlist[0].value,
        desc: this.data.textvalue,
        tel: this.data.tel,
        contact_name: this.data.username,
        // 可选
        rents_bet: this.data.rents_bet,
        rents_pay: this.data.rents_pay,
        location: this.data.addDetails,
        lgt: this.data.lgt,
        lat: this.data.lat,
        faceimg: faceimg
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
          duration: 3000
        })
        let settime = setTimeout(() => {
          wx.navigateBack({
            delta: 1
          })
          clearTimeout(settime)
        }, 3000)

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
  iSfill() {
    if (!this.data.value) {
      wx.showToast({
        title: "请输入标题",
        icon: "none"
      })
      return;
    }
    if (!this.data.formlist[0].value) {
      wx.showToast({
        title: "请选择小区",
        icon: "none"
      })
      return;
    }
    if (this.data.defaultType.length == 0) {
      wx.showToast({
        title: "请选择户型",
        icon: "none"
      })
      return;
    }
    if (!this.data.floor) {
      wx.showToast({
        title: "请选择楼层",
        icon: "none"
      })
      return;
    }
    if (!this.data.celFit) {
      wx.showToast({
        title: "请选择装修",
        icon: "none"
      })
      return;
    }
    if (!this.data.formlist[4].value) {
      wx.showToast({
        title: "请填写面积",
        icon: "none"
      })
      return;
    }
    if (this.data.defaultElevator.length == 0) {
      wx.showToast({
        title: "请选择是否有电梯",
        icon: "none"
      })
      return;
    }
    if (!this.data.rentNum) {
      wx.showToast({
        title: "请填写租金",
        icon: "none"
      })
      return;
    }
    if (this.data.image.length == 0) {
      wx.showToast({
        title: "请上传房屋照片",
        icon: "none"
      })
      return;
    }
    if (!this.data.textvalue) {
      wx.showToast({
        title: "请填写房屋简介",
        icon: "none"
      })
      return;
    }
    if (this.data.id) {
      this.upData()
      return;
    }
    this.subunit()
  },
  //房屋简介
  OnText(e) {
    this.setData({
      textvalue: e.detail.value
    })
  },
  //删除图片
  delImage(e) {
    let index = e.currentTarget.dataset.index
    this.data.image.splice(index, 1)
    this.setData({
      image: this.data.image
    })
  },
  //删除封面
  clarImg() {
    this.setData({
      coverImg: ''
    })
  },
  //选择图片
  selPhoto() {
    this.setData({
      flag: false
    })
    this.succ()
  },
  //选择封面
  celCover() {
    this.setData({
      flag: true
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
  //押金确定选择
  confirmCash(e) {
    let value = e.detail.value
    let text = value[0].label != '不需要' ? value[0].label : ''
    let rents = ''
    if (value[0].extra) {
      rents = value[0].extra
    } else {
      rents = ''
    }
    this.setData({
      rents_bet: rents,
      rents_pay: value[1].value,
      cash: text + value[1].label,
      cashShow: false
    })
  },
  // 关闭押金选择
  onCash() {
    this.setData({
      cashShow: false
    })
  },
  // 打开押金
  openCash() {
    this.setData({
      cashShow: true
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
            this.setData({
              username: Users.username,
              tel: Users.tel
            })
          },
        })
      },
      fail: () => {
        wx.switchTab({
          url: '/pages/index/index'
        })
      }
    })
  },
  // 图片
  succ() {
    wx.chooseImage({
      extension: ['jpg', 'jpeg', 'png', 'gif'],
      success: (chooseImageRes) => {
        const files = chooseImageRes.tempFilePaths;
        this.setData({
          isLoding: true
        })
        let that = this;
        if (files.length == 0) return;
        let func = [];
        files.forEach((item) => {
          func.push(that.upload(item));
        });

        Promise.all(func).then((res) => {
          that.setData({
            isLoding: false
          })
        }).catch((err) => {
          that.setData({
            isLoding: false
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
          if (that.data.flag == false) {
            that.data.image.push(jres.data.url)
            that.setData({
              image: that.data.image
            })
          }
          if (that.data.flag == true) {
            that.setData({
              coverImg: jres.data.url
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
    // 押金数据
    let cashLists = [{
        values: [{
          value: 1,
          label: '不需要'
        }],
        className: 'column1',
      },
      {
        values: [],
        className: 'column2',
      }
    ]
    for (var i = 1; i < 13; i++) {
      let floor = {
        value: i + 1,
        label: '押' + i,
        extra: i
      }
      let allFloor = {
        value: i,
        label: '付' + i
      }
      cashLists[0].values.push(floor)
      cashLists[1].values.push(allFloor)
    }
    this.setData({
      cashList: cashLists
    })

  },

  getData(id) {
    wx.showLoading({
      title: "加载中"
    })
    home.rentDils({
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
          celFit: data.zx,
          defaultElevator: [data.ele]
        })
        if (data.zx == 'low') {
          data.zx = '清水房'
        }
        if (data.zx == 'simple') {
          data.zx = '简装'
        }
        if (data.zx == 'well') {
          data.zx = '精装'
        }
        if (data.ele == 0) {
          data.ele = '无'
        }
        if (data.ele == 1) {
          data.ele = '有'
        }
        let village = 'formlist[0].value'
        let room = 'formlist[1].value'
        let floor = 'formlist[2].value'
        let zx = 'formlist[3].value'
        let area = 'formlist[4].value'
        let ele = 'formlist[5].value'
        let rents = data.rents_bet ? '押' + data.rents_bet : ''
        this.setData({
          value: data.title,
          [village]: data.village,
          [room]: data.room + '室' + data.hall + '厅' + data.bathroom + '卫',
          [floor]: data.floor + '/' + data.total_floor,
          [zx]: data.zx,
          [area]: data.area,
          [ele]: data.ele,
          rentNum: data.rents,
          cash: rents + '付' + data.rents_pay,
          textvalue: data.desc,
          image: data.album,
          coverImg: data.faceimg,
          floor: data.floor,
          totalFloor: data.total_floor,
          rents_bet: data.rents_bet,
          rents_pay: data.rents_pay,
          addDetails: data.location,
          lgt: data.lgt,
          lat: data.lat,

          defaultType: [data.room, data.hall, data.bathroom],
        })
      }
    })
  },
  upData() {
    let faceimg = this.data.coverImg
    if (!this.data.coverImg) {
      faceimg = this.data.image[0]
    }
    wx.showLoading({
      title: '提交中'
    })
    home.updataRoom({
      data: {
        id: this.data.id,
        // 必传
        title: this.data.value,
        room: this.data.defaultType[0],
        hall: this.data.defaultType[1],
        bathroom: this.data.defaultType[2],
        area: this.data.formlist[4].value,
        ele: this.data.defaultElevator[0],
        floor: this.data.floor,
        total_floor: this.data.totalFloor,
        zx: this.data.celFit,
        rents: this.data.rentNum,
        album: this.data.image,
        village: this.data.formlist[0].value,
        desc: this.data.textvalue,
        tel: this.data.tel,
        contact_name: this.data.username,
        // 可选
        rents_bet: this.data.rents_bet,
        rents_pay: this.data.rents_pay,
        location: this.data.addDetails,
        lgt: this.data.lgt,
        lat: this.data.lat,
        faceimg: faceimg
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
          duration: 3000
        })

        let settime = setTimeout(() => {
          wx.navigateBack({
            delta: 3
          })
        }, 3000)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (!options.id) return;
    this.getData(options.id)
    this.setData({
      id: options.id
    })
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