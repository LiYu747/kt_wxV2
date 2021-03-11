// pages/residence/checkIn/checkIn.js
import village from '../../../vendor/village/village.js'
	import home from '../../../vendor/home/home.js'
	import cache from '../../../vendor/cache/cache.js'
	import user from '../../../vendor/user/userDetails.js'
  import jwt from '../../../vendor/auth/jwt.js' 
  import route from '../../../vendor/request/routes.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    record: [{
      label: '拜访人姓名',
      value: '',
      disabled: true
    },
    {
      label: '拜访人手机号',
      value: '',
      disabled: true
    },
    {
      label: '拜访人身份证',
      value: '',
      disabled: true
    },
    {
      label: '被访问人姓名',
      value: '',
      placeholder: '请输入被访问人姓名',
    },
    {
      label: '地址',
      value: '',
      placeholder: '请选择',
      disabled: true
    },
  ],
  //服务端返回的原始数据
  orgVillageLists: [],

  renderVillageLists: [],
  columns: [],
  iSidentity: false, //身份显示与隐藏
  show: false,//地址
  household: '',// 住户选择
  id:[],//选择地址的id
  image:'', //图片上传
  mark:'',//备注
  isLoding:false,
  },
  
  //申请记录
  Application(){
   wx.navigateTo({
     url: '/pages/visitapplication/goRecord/goRecord',
   })
  },
   //提交
   Submit(){
     if(this.data.isLoding != false) return
     if (this.data.record[3].value == '') {
      wx.showToast({
        title: '请输入被访问人姓名',
        icon: 'none'
      })
      return;
    }
    if (this.data.id.length == 0) {
      wx.showToast({
        title: '请选择地址',
        icon: 'none'
      })
      return;
    }
    wx.showLoading({
      title: '提交中...'
    })
    home.VisitApplication({
      data: {
        hostName: this.data.record[3].value,
        villageId: this.data.id[0],
        buildingId: this.data.id[1],
        apartmentId: this.data.id[2],
        floorId: this.data.id[3],
        roomId: this.data.id[4],
        visitorRemark: this.data.mark,
        ext_img: this.data.image
      },
      fail: () => {
        wx.hideLoading()
        wx.showToast({
          title: '网络错误',
          icon: 'none'
        })
      },
      success: (res => {
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
          duration: 2000
        });
        const time = setTimeout(() => {
          wx.redirectTo({
            url: '/pages/visitapplication/goRecord/goRecord'
          })
          clearTimeout(time)
        }, 2000)
      }),
    })
   },
   //备注
   changeInput(e){
     this.setData({
      mark : e.detail.value
     })
   },
   //上传图片
  succ() {
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
        fail: () => {
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
          that.setData({
            image : jres.data.url
          })
          res(jres);
        }
      })
    })
  },
  // 确认地址选择
  onConfirm(e){
   let value = e.detail.value
   let add = ''
   let id = []
   value.map(item => {
    add += item.label
    id.push(item.extra)
   })
   let val = 'record[4].value'
   this.setData({ 
     show: false ,
     [val]: add,
     id:id
    });
  },
  // 取消地址选择
  onCancel(){
    this.setData({ show: false });
  },
  onClose() {
    this.setData({ show: false });
  },
  // 地址列表
  onChange(e){ 
    let column = e.detail.index  //第几排
    if(column==0){
      const { picker, value, index } = e.detail;
      picker.setColumnValues(1, value[0].children);
      picker.setColumnValues(2, value[0].children[0].children);
      picker.setColumnValues(3, value[0].children[0].children[0].children);
      picker.setColumnValues(4, value[0].children[0].children[0].children[0].children);
    }
    if(column == 1){
      const { picker, value, index } = e.detail;
      picker.setColumnValues(2, value[1].children);
      picker.setColumnValues(3, value[1].children[0].children);
      picker.setColumnValues(4, value[1].children[0].children[0].children);
    }
    if(column == 2){
      const { picker, value, index } = e.detail;
      picker.setColumnValues(3, value[2].children);
      picker.setColumnValues(4, value[2].children[0].children);
    }
    if(column == 3){
      const { picker, value, index } = e.detail;
      picker.setColumnValues(4, value[3].children);
    }
  },
 
    // 输入姓名
    Onchange(e){
      let value = 'record[3].value'
      this.setData({
        [value] : e.detail.value
      })

    },
  	// 显示选择小区
    Onshow(e) {
      let index = e.currentTarget.dataset.index
      if (index == this.data.record.length - 1) {
        this.setData({
          show : true
        })

      }
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
                var username = "record[0].value";
                var tel = "record[1].value"
                this.setData({
                  [username]: Users.username,
                  [tel]:Users.tel.slice(0, 3) + '****' + Users.tel.slice(7, 11)
                })
								if (!Users.id_card_no) { 
									wx.showModal({
										content: '请完善您的身份信息',
										success: function(res) {
											if (res.confirm) {
												wx.navigateTo({
													url: '/pages/user/realInformation/realInformation'
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
                var id_card_no = "record[2].value"
                this.setData({
                  [id_card_no]:Users.id_card_no.slice(0, 3) + '**********' + Users.id_card_no.slice(Users.id_card_no
                    .length - 4, Users.id_card_no.length),
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
      
      loadVillageLists() {
				let that = this;
				// 小区列表
				village.selectLists({
					data: {},
					fail: ()=> {
						wx.showToast({
							title: '网络错误',
							icon: 'none'
						})
					},
					success: (res) => {
						// console.log(res);
						if (res.statusCode != 200) return;

						if (res.data.code != 200) return;
            this.setData({
              orgVillageLists:res.data.data
            })
						this.renderMSelect();
					},
				})
			},

			//使用返回的数据进行渲染select
			renderMSelect() {
				//renderVillageLists
				if (!this.data.orgVillageLists || this.data.orgVillageLists.length == 0) {
					this.renderVillageLists = [];
					return;
				}

				//进行修改
				let tmp = [];

				this.data.orgVillageLists.forEach((item, index) => {
					let villages = {
						label: item.name,
						value: index,
						extra: item.id,
						children: [],
					};

					if (!item.buildings) return true;
					//楼栋
					item.buildings.forEach((item2, idx2) => {
						let buildings = {
							label: item2.name,
							value: idx2,
							extra: item2.id,
							children: [],
						};
						// console.log('buildings', item2, !item2.apartments)
						if (!item2.apartments) return true;
						item2.apartments.forEach((item5, idx3) => {

							//单元楼
							let ap = {
								label: item5.name,
								value: idx3,
								extra: item5.id,
								children: [],
							};

							if (!item5.floors) return true;

							item5.floors.forEach((item3, index3) => {

								//楼层
								let floors = {
									label: item3.name,
									value: index3,
									extra: item3.id,
									children: [],
								};

								// console.log('item3', item3)
								if (!item3.rooms) return true;
								//门牌号
								item3.rooms.forEach((item4, idx4) => {
									floors.children.push({
										label: item4.room_number,
										value: idx4,
										extra: item4.id,
									});
								})

								ap.children.push(floors);
							})


							buildings.children.push(ap);

						})

						villages.children.push(buildings);
					})

					tmp.push(villages);
        })
       
        let columns =  [{
          values: tmp,
          className: 'column1',
        },
        {
          values: tmp[0]['children'],
          className: 'column2',
        },
        {
          values:tmp[0]['children'][0]['children'],
          className: 'column3',
        },
        {
          values:tmp[0]['children'][0]['children'][0]['children'],
          className: 'column4',
        },
        {
          values:tmp[0]['children'][0]['children'][0]['children'][0]['children'],
          className: 'column5',
        }]
        this.setData({
          columns:columns,
        });
      
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
       
       this.loadVillageLists()
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