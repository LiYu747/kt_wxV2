// pages/propertyManagement/userQuery/userQuery.js
import home from '../../../vendor/home/home.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
  	falg:false,
				noText: '',
				page: 1,
				pageSize: 15,
				username: '',
				isLoading: false,
				hasMore: true,
				locdata: [],
				lists: []
  },
     

  	// 取消
    cancel(){
      this.setData({
        falg : false,
        username : '',
        page : 1,
        lists : []
      })
      this.getData()
    },
    	// 搜索
			search(){
        this.setData({
          noText : '',
          falg : true,
          lists : [],
          page : 1,
        })
				this.getData()
			},
  //输入框值
  Onchange(e){
   this.setData({
     username : e.detail.value
   })
  },
   //获取数据
   getData() {
     this.setData({
      isLoading : true
     })
    home.allResident({
      data: {
        username: this.data.username,
        page: this.data.page,
        pageSize: this.data.pageSize
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
        if(res.data.code == 200) {
          let data = res.data.data
          data.data.map(item => {
            item.tel = item.tel.slice(0, 3) + '****' + item.tel.slice(7, 11)
            item.id_card_no = item.id_card_no.slice(0, 3) + '*************' + item.id_card_no.slice(item.id_card_no.length -
              4, item.id_card_no.length)
            if (item.sex == 1) {
              item.sex = '男'
            }
            if (item.sex == 2) {
              item.sex = '女'
            }
          })
          let lists = this.data.lists
          lists = lists.concat(data.data)
          this.setData({
            lists : lists,
            page :  data.current_page + 1,
            hasMore : data.next_page_url ? true : false,
          })
          // console.log(data.data);
        }
        else{
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