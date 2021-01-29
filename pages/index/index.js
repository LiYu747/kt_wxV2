//index.js
//获取应用实例
import home from '../../vendor/home/home'
const app = getApp()

Page({
  data: {
    list: [], //轮播图
    indicatorDots: false,
    vertical: false,
    autoplay: false,
    interval: 2000,
    duration: 500,
    current:0,   /*以上为轮播图数据*/
    localdata: [], //操作数据
    clalists:[],//分类数据
    infoloctext:[], //社区资讯数据
    iScroll:false, //社区新闻是否滚动
    text:'', //社区新闻数据
    perlocdata:[],//周边消息数据
  	userType: [{
      name: '用户',
      type: 'user',
      url: '/pages/index/index'
    },
    {
      name: '物业',
      type: 'property',
      url: '/pages/propertyManagement/propertyhome/propertyhome'
    },
    {
      name: '快递、外卖',
      type: 'expressage',
      url: '/pages/userMessenger/userhome/userhome'
    }
  ],
  isShowType: false,
  value: '', //搜索绑定v-model
  user: {}, //用户资料
  paly: false,
  videoUrl: '', //视频地址
  cover: '', //视频封面
  showPullDownRefreshIcon: true,
  informmsg:{},//用户未读消息数量
  },
  add:function(){
     wx.navigateTo({
       url: '/pages/loginAndR/login/login',
     })
  },
  // 显示物业外卖
  ShowType () {
    this.setData({
      isShowType : !this.data.isShowType
    })
  },
  // 输入框输入值
  inputchange(e){
   this.setData({
    value : e.detail.value
   })
  },
  // 搜索
  confirm () {
    wx.navigateTo({
      url: '/pages/homeSearch/search?text=' + this.data.value,
    })
  },

  // 轮播图数据
  Chart() {
    home.chart({
      data: {
        code: 'home_index_banner'
      },
      fail: () => {
        this.stopRefreshIcon()
        wx.showToast({
          title: '网络出错',
          icon: 'none'
        })
      },
      success: (res) => {
        this.stopRefreshIcon()
        if (res.statusCode != 200) return
        if (res.data.code != 200) return
        this.setData({
          list: res.data.data.ads
        })
      },
    })
      },                                                    

  // 轮播图index
  onchange: function (e) {
    this.setData({
      current :e.detail.current
    })
  },

  // 操作数据
  operationData() {
    home.chart({
      data: {
        code: 'home_quick_nav_1'
      },
      fail: () => {
        this.stopRefreshIcon()
        wx.showToast({
          title: '网络出错',
          icon: 'none'
        })
      },
      success: (res) => {
        this.stopRefreshIcon()
        if (res.statusCode != 200) return
        if (res.data.code != 200) return
        this.setData({
          localdata: res.data.data.ads
        })
      },
    })
  },

  //  分类数据
  Calss() {  
    home.chart({
      data: {
        code: 'home_quick_nav_2'
      },
      fail: () => {
        this.stopRefreshIcon()
        wx.showToast({
          title:'网络错误',
        icon:'none'
        })
      },
      success: (res) => {
        this.stopRefreshIcon()
        if (res.statusCode != 200) return
        if (res.data.code != 200) return
        this.setData({
          clalists : res.data.data.ads
        })
      },
    })
  },

  // 社区资讯数据
  Datainfo() {
    home.infortion({
      data: {
        page: 1,
        pageSize:1
      },
      fail: () => {
        this.stopRefreshIcon()
        wx.showToast({
          title: '网络错误',
          icon: 'none'
        })
      },
      success: (res) => {
        this.stopRefreshIcon()
        if (res.statusCode != 200) return
        if (res.data.code != 200) return
        this.setData({
          infoloctext:res.data.data.data
        })
      },
    })
  },
     
    //社区新闻
  comgetData() {
    home.CommunityNews({
      data: {
        page:1,
				pageSize:1
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
        if(res.data.data.data.length>0){
          let text = res.data.data.data[0].title
          if(text.length > 15){
            this.setData({
              iScroll : true
            })
          }
          this.setData({
            text: text
          })
        }
      }
    })
  },

    //周边消息
			pergetData() {
				home.news({
					data: {
						page: 1,
						pageSize:4
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
            let data = res.data.data.data
            data.map(item => {
              item.created_at = item.created_at.slice(0,10)
            })
            this.setData({
              perlocdata : data
            })
       
					},
				})
			},

  	// 下拉刷新
    stopRefreshIcon() {
      if (this.data.showPullDownRefreshIcon == false) {
        wx.stopPullDownRefresh();
        this.setData({
          showPullDownRefreshIcon : true
        })
      }
    },
   
  onReady: function () {
  //  轮播图数据
     this.Chart()

  //操作数据
     this.operationData()   

  //分类数据
      this.Calss()  
      
  //社区资讯数据
      this.Datainfo()

   //社区新闻
      this.comgetData()   

   //周边消息
      this.pergetData()   
  },

  


  onShow: function (){
    this.setData ({
      value : '',
      isShowType : false
    })
  },
   // 下拉刷新
   onPullDownRefresh() {
     this.setData({
      showPullDownRefreshIcon: false
     })
     this.Chart()
     this.operationData()  
     this.Calss()
     this.Datainfo()
     this.comgetData()
     this.pergetData()     
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
