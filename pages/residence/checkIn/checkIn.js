// pages/residence/checkIn/checkIn.js
import village from '../../../vendor/village/village.js'
	import home from '../../../vendor/home/home.js'
	import cache from '../../../vendor/cache/cache.js'
	import user from '../../../vendor/user/userDetails.js'
  import jwt from '../../../vendor/auth/jwt.js' 
  import route from '../../../vendor/request/routes.js'
 const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navBarHeight: app.globalData.navBarHeight,
    menuHeight: app.globalData.menuHeight,
    menuBotton: app.globalData.menuBotton,
    Villid:"", //小区id
    options: [{
      value: '1',
      label: '户主'
    },
    {
      value: '2',
      label: '家庭成员'
    },
    {
      value: '3',
      label: '租户'
    }
  ],
    record: [{
      label: '姓名',
      value: '',
      disabled: true,
      placeholder: '请输入姓名',
    },
    {
      label: '手机号',
      value: '',
      disabled: true,
      placeholder: '请输入手机号',
    },
    {
      label: '身份证号',
      value: '',
      disabled: true,
      placeholder: '请输入身份证号',
    },
    {
      label: '入住身份',
      value: '',
      placeholder: '请选择',
      disabled: true
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
  image:[], //图片上传
  mark:'',//备注
  title:'',//标题
  isLoding:false,
  Gshow:0,
  idx:0,
  able:false
  },
   
  move(){

  },
  navback(){
    if(cache.get('Gshow')){
      wx.showModal({
        content: '您确定要退出新手指导？您也可以到个人中心、关于快通中重新开启',
        success: function (res) {
          if (res.confirm) {
            cache.forget('Gshow')
            wx.switchTab({
              url: '/pages/userAddress/userAddress',
            })
          } else if (res.cancel) {
          }
        }
      })
      return;
    }
    wx.navigateBack({
      delta: 1,
    })
  },
  nextTo(){
    return;
    if(this.data.Gshow == 4) return;
    this.setData({
      idx :  this.data.idx +1
    })
    if(this.data.idx == 3){
      this.setData({
        Gshow : 4
      })
      cache.set('Gshow',{key:'步骤'+ 4,value: 4})
    }
  },
  //申请记录
  Application(){
   wx.navigateTo({
     url: '/pages/residence/checkRecord/checkRecord',
   })
  },
   //提交
   Submit(){
    // if(cache.get('Gshow')){
    //   const time = setTimeout(() => {
    //    wx.switchTab({
    //      url:'/pages/userAddress/userAddress'
    //    })
    //    cache.set('Gshow',{key:'步骤'+ 5,value: 5})
    //    clearTimeout(time)
    //   }, 2000)
    //   return;
    //  }
     if(this.data.isLoding != false) return
     if (this.data.household == '') {
      wx.showToast({
        title: '请选择住户类型',
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
    home.moveInApply({
      data: {
        type: this.data.household,
        village_id: this.data.Villid,
        building_id: this.data.id[0],
        apartment_id: this.data.id[1],
        floor_id: this.data.id[2],
        room_id: this.data.id[3],
        user_remark: this.data.mark,
        pics: this.data.image
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
            url: '/pages/residence/checkRecord/checkRecord'
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
    if (this.data.Gshow == 3) {
      this.nextTo()
      return;}
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
         const { image } = that.data
         image.push(jres.data.url)
          that.setData({
            image :  image
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
    }
    if(column == 1){
      const { picker, value, index } = e.detail;
      picker.setColumnValues(2, value[1].children);
      picker.setColumnValues(3, value[1].children[0].children);
    }
    if(column == 2){
      const { picker, value, index } = e.detail;
      picker.setColumnValues(3, value[2].children);
    }
  },
 
    // 选择住户类型
			selectOne(e) {
        let item = e.currentTarget.dataset.item
        let label = 'record[3].value'
        this.setData({
          [label]:item.label,
          household:item.value
        })
			},
  	// 显示选择小区
    Onshow(e) {
      if (this.data.Gshow == 3) {
        this.nextTo()
        return;}
      let index = e.currentTarget.dataset.index
      if (index == this.data.record.length - 2) {
        this.setData({
          iSidentity : !this.data.iSidentity
        })
      }
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
                if (res.data.code != 200 && res.data.code !=4405) return;
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
				village.displayInformation({
					data: {
						id: this.data.Villid,
						need_buildings: '1'
					},
					fail: () => {
						wx.showToast({
							title: '网络错误',
							icon: 'none'
						})
					},
					success: (res) => {
						if (res.statusCode != 200) return
						if (res.data.code != 200) return
						// console.log('小区展示', res);
            let data = res.data.data.buildings
            this.setData({
              orgVillageLists : data,
              title:res.data.data.info.name
            })
						this.renderMSelect();
					}
				})
			},

			//使用返回的数据进行渲染select
			renderMSelect() {
        if (!this.data.orgVillageLists || this.data.orgVillageLists.length == 0) {
					this.renderVillageLists = [];
					return;
				}

				//进行修改
				let tmp = [];
				this.data.orgVillageLists.forEach((item, index) => {
					//楼栋
					let villages = {
						label: item.name,
						value: index,
						extra: item.id,
						children: [],
					};
					
					if (!item.apartments) return true;
					//单元
					item.apartments.forEach((item2, idx2) => {
						let apartments = {
							label: item2.name,
							value: idx2,
							extra: item2.id,
							children: [],
						};
						// console.log('buildings', item2, !item2.apartments)
						if (!item2.floors) return true;
						   //楼层
						item2.floors.forEach((item5, idx3) => {

							//楼层
							let floors = {
								label: item5.name,
								value: idx3,
								extra: item5.id,
								children: [],
							};

							if (!item5.rooms) return true;

							item5.rooms.forEach((item4, idx4) => {
								floors.children.push({
									label: item4.name,
									value: idx4,
									extra: item4.id,
								});
							})

							apartments.children.push(floors);


						})
						villages.children.push(apartments);

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
        }]
        this.setData({
          columns:columns,
        });
      
      },  
     
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (val) {
    this.setData({
      Villid : val.id
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    if(cache.get('Gshow')){
      this.setData({
        Gshow : cache.get('Gshow').value,
      })
    }
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
    // if(!cache.get('Gshow')) return;
    // if(cache.get('Gshow').value == 3||cache.get('Gshow').value == 4){
    //   wx.navigateTo({
    //     url: '/pages/residence/checkIn/checkIn',
    //   })
    //       wx.showModal({
    //         content: '您确定要退出新手指导？您也可以到个人中心、关于快通中重新开启',
    //         success: function (res) {
    //           if (res.confirm) {
    //             cache.forget('Gshow')
    //             wx.navigateBack({
    //               delta: 1
    //             });
    //           } else if (res.cancel) {
    //           }
    //         }
    //       })
    // }
    
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