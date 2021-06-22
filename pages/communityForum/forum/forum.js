// pages/communityForum/forum/forum.js
import village from '../../../vendor/village/village.js'
import userDetails from '../../../vendor/user/userDetails'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    code:0,
    id: "",
    arr: {}, //数据
    user: {},
    comments: [], //获取评论
    flag: false,
    context: '',
    page: 1,
    pageSize: 15,
    isLoding: false,
    hasMore: true,
    text: '',
    inputOffsetBottom:0,//键盘高度
    userID:'',//用户id
  },

 
  	//删除
    delmsg(e) {
      let item = e.currentTarget.dataset.item
      let index = e.currentTarget.dataset.index
      //帖子是自己发布的
      if (this.data.user.id == this.data.userID) {
        wx.showModal({
          content: "您确定要删除吗",
          success: (res) => {
            if(res.confirm){
              this.deluserPost(item.id)
              this.data.comments.splice(index, 1)
              this.setData({
                comments : this.data.comments
              })
            }
          }
        })
        return;
      }
      //删除别人帖子中自己的评论
      if (item.own_commentator.id == this.data.userID) {
        wx.showModal({
          content: "您确定要删除吗",
          success: (res) => {
            if(res.confirm){
              this.delPost(item.id)
              this.data.comments.splice(index, 1)
              this.setData({
                comments :  this.data.comments
              })
            }
          }
        })
        
      }

    },
	//删除自己帖子的评论
  deluserPost(id) {
    village.deluserPost({
      data: {id:id},
      fail: () => {
        wx.showToast({
          title: '网络错误',
          icon: 'none'
        })
      },
      success: (res) => {
        if (res.statusCode != 200) {
          wx.showToast({
            title: '网络错误',
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
        this.setData({
          text : ''
        })
        app.userIscomment = res.data.code
        wx.showToast({
          title: res.data.msg,
          icon: 'none'
        })
      }
    })
  },
  
  //删除自己的评论
  delPost(id) {
    village.delPost({
      data: {id:id},
      fail: () => {
        wx.showToast({
          title: '网络错误',
          icon: 'none'
        })
      },
      success: (res) => {
        if (res.statusCode != 200) {
          wx.showToast({
            title: '网络错误',
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
        this.setData({
          text : ''
        })
        console.log(1)
        app.userIscomment = res.data.code
        wx.showToast({
          title: res.data.msg,
          icon: 'none'
        })
      }
    })
  },

  off(){
    this.setData({
      isLook : false
     })
  },

   //查看图片
   lookUp(e){
     let index = e.currentTarget.dataset.index
     	// 预览图片
				wx.previewImage({
					urls:this.data.arr.album, 
					current: this.data.arr.album[index],
					indicator:"default", 
        });
   },
  //获取输入文本
  Onchange(e) {
    this.setData({
      context: e.detail.value
    })
  },
  // 发送评论
  send() {
    if(this.data.context == ''){
      wx.showToast({
        title: '请输入评论内容',
        icon:'none'
      })
      return;
    }
    wx.showLoading({
      title: '发送中'
    })
    village.relComments({
      data: {
        post_id: this.data.id,
        content: this.data.context
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
        if (res.statusCode != 200) return;
        if (res.data.code != 200) {
          wx.showToast({
            title: res.data.msg,
            duration: 2000,
            icon: 'none'
          })
          return;
        }
        this.setData({
          page: 1,
          context: '',
          comments: [],
        })
        this.loadPageData()
        wx.showToast({
          title: res.data.msg,
          icon:'none',
          duration: 2000
        })
        app.userIscomment = res.data.code
      }
    })
  },
  // 打开评论
  open() {
    this.setData({
      flag: !this.data.flag
    })
  },
  // 评论获取数据
  loadPageData() {
    this.setData({
      isLoding: true
    })
    village.postComments({
      data: {
        post_id: this.data.id,
        page: this.data.page,
        pageSize: this.data.pageSize
      },
      fail: () => {
        this.setData({
          isLoding: false
        })
        wx.showToast({
          title: '网络错误',
          icon: 'none'
        })
      },
      success: (res) => {
        this.setData({
          isLoding: false
        })
        if (res.statusCode != 200) return; 

        if (res.data.code != 200) return;

        let data = res.data.data;
        data.data.map(item => {
          item.created_at = item.created_at.slice(0, 16)
            //帖子是自己发布的
            if (this.data.user.id == this.data.userID) {
              item.Isdel = true;
               return;
            }
           //别人帖子中自己的评论
          if (item.own_commentator.id == this.data.userID) {
            item.Isdel = true;
            return;
          }
        })
        let lists = this.data.comments
        lists = lists.concat(data.data)
        this.setData({
          hasMore: data.next_page_url ? true : false,
          page: data.current_page + 1,
          comments: lists
        })
      },
    })
  },
  // 详情数据 
  getData() {
    this.setData({
      isLoding: true
    })
    village.postDetails({
      data: {
        id: this.data.id
      },
      fail: () => {
        this.setData({
          isLoding: false
        })
        wx.showToast({
          title: '网络错误',
          icon: 'none'
        })
      },
      success: (res) => {
        this.setData({
          isLoding: false
        })
        // console.log(res.data.data);
        if (res.statusCode != 200) return
        if (res.data.code != 200) {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 2000
          })
          return;
        }
        let data = res.data.data
        data.created_at = data.created_at.slice(0, 16)
        this.setData({
          code:res.data.code,
          arr: data,
          user: data.own_poster
        })
        this.loadPageData()
      }
    })
  },

  	// 获取用户资料
    getUser() {
      userDetails.userDeta({
        data: {},
        fail: () => {
          wx.showToast({
            title: '网络错误',
            icon: 'none'
          })
        },
        success: (res) => {
          this.setData({
            userID : res.data.data.id
          })
          this.getData()
        },

      })
    },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
      this.getUser()
      // 监听键盘高度变化，以便设置输入框的高度
		  wx.onKeyboardHeightChange(res => {
        this.setData({
          inputOffsetBottom : res.height
        })
		  })
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
      text: '没有更多了'
    })
    if (this.data.isLoding == true || this.data.hasMore == false) return;
    this.loadPageData()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})