// pages/propertyManagement/userQuery/userQuery.js
import home from '../../../vendor/home/home.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    condition: [{
      label: '全部',
      status: ''
    },
    {
      label: '户主',
      status: '1'
    },
    {
      label: '家庭成员',
      status: '2'
    },
    {
      label: '租户',
      status: '3'
    },
  ],
    falg: false,
    noText: '',
    page: 1,
    pageSize: 15,
    username: '',
    isLoading: false,
    hasMore: true,
    locdata: [],
    lists: [],
    xlshow:false,
    idx:0,
    status:""
  },
  
    
     // 用户详情
			goUserDetails(e) {
				wx.navigateTo({
					url: '/pages/propertyManagement/userQuery/theUserDetails/theUserDetails?id=' + e.currentTarget.dataset.item.id
				})
			},

  	// 筛选
    select(e) {
      let index = e.currentTarget.dataset.index
      let item = e.currentTarget.dataset.item
      this.setData({
        idx : index,
        xlshow : false,
        username : '',
        status : item.status,
        page : 1,
        noText : '',
        lists : [],
        falg : true
      })
      this.getData()
    },

  //打开筛选
  celShow(){
  this.setData({
    xlshow : !this.data.xlshow
  })
  },

  // 搜索
  search() {
    this.setData({
      noText: '',
      falg: true,
      status:'',
      lists: [],
      page: 1,
    })
    this.getData()
  },
  //输入框值
  Onchange(e) {
    this.setData({
      username: e.detail.value
    })
  },
  //获取数据
  getData() {
    this.setData({
      isLoading: true
    })
    home.allResident({
      data: {
        username: this.data.username,
        page: this.data.page,
        pageSize: this.data.pageSize,
        type: this.data.status
      },
      fail: () => {
        this.setData({
          isLoading: false
        })
        wx.showToast({
          title: '网络错误',
          icon: "none"
        })
      },
      success: (res) => {
        this.setData({
          isLoading: false
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
        if (res.data.code != 200) {
          wx.showToast({
            title: res.data.msg,
            icon: "none"
          })
          return;
        }
        let data = res.data.data
        data.data.map(item => {
          switch (item.type) {
            case 1:
              item.type = '户主'
              break;
            case 2:
              item.type = '家庭成员'
              break;
            case 3:
              item.type = '租户'
          }
          if (item.valid_begin) {
            item.valid_begin = item.valid_begin.slice(0, 10)
          }
        })
        let lists = this.data.lists
        lists = lists.concat(data.data)
        this.setData({
          code : res.data.code,
          lists: lists,
          page: data.current_page + 1,
          hasMore: data.next_page_url ? true : false,
        })
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
    this.setData({
      noText: '没有更多了'
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