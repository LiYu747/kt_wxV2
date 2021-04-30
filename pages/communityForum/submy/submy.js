// pages/communityForum/submy/submy.js
import village from '../../../vendor/village/village.js'
import cache from '../../../vendor/cache/cache.js'
import user from '../../../vendor/user/userDetails.js'
import jwt from '../../../vendor/auth/jwt.js'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hig:'',
    id:'',
    til: [{
      name: '我发布的',
    }, {
      name: '我参与的',
    }],
    scrollTop: 0,
    idx: 0,
    username: '', //姓名
    lists: [], //我发布的
    page: 1,
    text: '',
    isLoding: false, //是否显示loding
    hasMore: true, //是否还有更多
    code: 1,
    data1: [], //我参与的
    page1: 1,
    pageSize1: 15,
    text1: '',
    isLoding1: false, //是否显示loding
    hasMore1: true, //是否还有更多
    code1: 1,
    clientX: '',
    goindex: '', //查看哪一项的index
  },
      

      	// 去详情
			gotoD(e) {
        let index = e.currentTarget.dataset.index
        let item = e.currentTarget.dataset.item
        this.setData({
          goindex : index 
        })
				wx.navigateTo({
					url: `/pages/communityForum/mypostdeta/mypostdeta?id=${item.id}`
				})
			},
     // 跳转回复的页面
			reply(e) {
        let item = e.currentTarget.dataset.item
				if (!item.own_village_tribune) {
					wx.showToast({
						title: '该帖子已被用户删除',
						icon: 'none'
					})
					return;
				}
				wx.navigateTo({
					url: `/pages/communityForum/forum/forum?id=${item.tribune_id}`
				})
			},
   	// 自己评论的帖子
     SelfPost() {
      this.setData({
        isLoding1 : true
      })
      village.SelfPost({
        data: {
          page: this.data.page1,
          pageSize: this.data.pageSize1
        },
        fail: () => {
          this.setData({
            isLoding1 : false
          })
          wx.showToast({
            title: '网络错误',
            icon: 'none'
          })
        },
        success: (res) => {
          this.setData({
            isLoding1 : false
          })
          if (res.statusCode != 200) return;

          if (res.data.code != 200) return;
          let data = res.data.data;
          let lists = this.data.data1
          lists = lists.concat(data.data)
          this.setData({
            data1 : lists,
            page1 : data.current_page + 1,
            hasMore1 : data.next_page_url ? true : false
          })
        },

      })

    },
  // 自己发布的帖子 获取数据
  loadPageData() {
    this.setData({
      isLoding : true
    })
    village.SelfComments({
      data: {
        villageId: this.data.id,
        page: this.data.page,
      },
      fail: () => {
        this.setData({
          isLoding : false
        })
        wx.showToast({
          title: '网络错误',
          icon: 'none'
        })
      },
      success: (res) => {
        this.setData({
          isLoding : false
        })

        if (res.statusCode != 200) return;

        if (res.data.code != 200) return;
        
        let data = res.data.data;
        data.data.map( item => {
            item.album = item.album.slice(0,3)
        })
        let lists =  this.data.lists
        lists = lists.concat(data.data)
        this.setData({
          lists : lists,
          page :  data.current_page + 1,
          hasMore : data.next_page_url ? true : false
        })
      },

    })

  },
  // 下拉加载更多
  onreachBottom1() {
    this.setData({
      text : '没有更多了'
    })
    if (this.data.isLoding == true || this.data.hasMore == false) return;
    this.loadPageData()
  },
  // 下拉加载更多
  onreachBottom2() {
    this.setData({
      text1 : '没有更多了'
    })
    if (this.data.isLoding1 == true || this.data.hasMore1 == false) return;
    this.SelfPost()
  },
  //  选择类别
  add(e) {
    let index = e.currentTarget.dataset.index
    this.setData({
      idx : index
    })
  },

  // 获取用户资料
  Userdata() {
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
        // console.log(res);
        let Users = res.data.data
        this.setData({
          username : Users.username
        })
      },

    })
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
    this.Userdata()
   this.loadPageData()
   this.SelfPost()
   let num =  app.globalData.navBarHeight + 102 + 'px'
   this.setData({
    hig : `height:calc(100vh - ${num})`
   })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if ( app.myPostisDel == 200) {
        this.data.lists.splice(this.data.goindex,1)
        this.setData({
          lists :  this.data.lists,
          page1 : 1,
          data1 : []
        })
        this.SelfPost()
    }
    if(app.userIscomment == 200) {
     this.setData({
         page1 : 1,
        data1 : []
     })
     this.SelfPost()
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    app.myPostisDel = 0
    app.userIscomment = 0
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    app.myPostisDel = 0
    app.userIscomment = 0
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