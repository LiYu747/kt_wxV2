// pages/propertyManagement/CheckToSee/CheckToSee.js
import home from '../../../vendor/home/home.js'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    xlshow: false, //是否显示筛选框
    falg: false, //判断是否有筛选内容
    idx: 0,
    noText: '',
    page: 1,
    pageSize: 15,
    status: '', //筛选的条件
    isLoading: false,
    hasMore: true,
    lists: [],
    condition: [{
        label: '全部',
        status: ''
      },
      {
        label: '待审核',
        status: '1'
      },
      {
        label: '已通过',
        status: '2'
      },
      {
        label: '未通过',
        status: '3'
      },
    ],
    goIndex:0
  },
     

  	// 用户详情
    goDetails(e) {
      let item = e.currentTarget.dataset.item
      let index = e.currentTarget.dataset.index
      this.setData({
        goIndex : index
      })
      wx.navigateTo({
        url: '/pages/propertyManagement/CheckToSee/seeDetails/seeDetails?id=' + item.id
      })
    },
   	// 筛选
     select(e) {
       if(e.currentTarget.dataset.index == this.data.idx) return;
       let index = e.currentTarget.dataset.index
       let item = e.currentTarget.dataset.item
       this.setData({
        idx : index ,
        xlshow : false,
        falg : true,
        status : item.status,
        page : 1 ,
        noText : '',
        lists : []
       })
      this.getData()
    },
  //筛选打开
  celShow(){
   this.setData({
    xlshow : !this.data.xlshow
   })
  },
   //获取数据
  getData() {
    this.setData({
      isLoading : true
    })
    home.checkinRecord({
      data: {
        page: this.data.page,
        pageSize: this.data.pageSize,
        verify_status: this.data.status
      },
      fail: () => {
        this.setData({
          isLoading : false
        })
        wx.showToast({
          title: '网络错误',
          icon: "none"
        })
      },
      success: (res) => {
        this.setData({
          isLoading : false
        })
        if (res.statusCode != 200) {
          wx.showToast({
            title: '网络出错了',
            icon: "none"
          })
          return;
        }
        if (res.data.code == 403) {
          wx.showModal({
            content: res.data.msg + '访问',
            success: (res) => {
              wx.navigateBack({
                delta: 1
              })
            }
          })
          return;
        }
        if (res.data.code == 200) {
          let data = res.data.data
          data.data.map(item => {
            item.address = item.own_village.name + item.own_building.name + item.own_apartment.name + item.own_floor.name +
              item.own_room.room_number
            item.created_at = item.created_at.slice(0, 16)
            item.own_user.tel = item.own_user.tel.slice(0, 3) + '****' + item.own_user.tel.slice(7, 11)
          })
          let lists = this.data.lists
          lists = lists.concat(data.data)
          this.setData({
            lists : lists,
            page : data.current_page + 1,
            hasMore :  data.next_page_url ? true : false
          })
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: "none"
          })
        }


      }
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
    this.getData()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if(app.checkSeePass !== ''){
       let lists =  this.data.lists
       lists.map((item,index) => {
         if(index == this.data.goIndex){
           item.verify_status_text = app.checkSeePass
         }
       })
       this.setData({
        lists : lists
       })
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    app.checkSeePass = ''
    this.setData({
      xlshow : false
    })
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
    this.setData({
      noText : '没有更多了'
    })
    if (this.data.isLoding == true || this.data.hasMore == false) return;
    this.getData()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})