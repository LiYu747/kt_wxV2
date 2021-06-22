//index.js
//获取应用实例
import home from '../../vendor/home/home'
import urlUtil from '../../vendor/common/url.js';
import cache from '../../vendor/cache/cache.js'
const app = getApp()
Page({
  data: {
    list: [], //轮播图
    indicatorDots: false,
    vertical: false,
    autoplay: false,
    interval: 2000,
    duration: 500,
    current: 0,
    /*以上为轮播图数据*/
    localdata: [], //操作数据
    clalists: [], //分类数据
    infoloctext: [], //社区资讯数据
    newData: [], //社区新闻数据
    perlocdata: [], //周边消息数据
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
    informmsg: {}, //用户未读消息数量
    Gshow: null,
    idx:0,
    localdata: [
      {image:'/image/home/rz.png',name:'入住申请',url:'/pages/residence/seachVill/seachVill?code=1'},
      {image:'/image/home/bf.png',name:'拜访申请',url:'/pages/residence/seachVill/seachVill?code=2'},
      {image:'/image/home/lf.png',name:'来访记录',url:'/pages/operation/visitRecord/visitRecord'},
      {image:'/image/home/code.png',name:'回家二维码',url:'/pages/qrcode/qrcode'}],  
  },
   move(){

   },
   lookmore(){
    wx.navigateTo({
      url: '/pages/index/peripheryMore/peripheryMore',
    })
   },
   offShowbox(){
     this.setData({
      isShowType : false
     })
   },
  nextT() {
    return;
    this.setData({
      idx : this.data.idx + 1
    })
    if(this.data.idx==4) {
      let num = this.data.Gshow+1
      cache.set('Gshow',{key:'步骤'+ num,value: num})
       this.setData({
        Gshow : null
       })
      wx.switchTab({
        url:'/pages/userinfo/userinfo'
      })
    }
  },
  GgoAdd() {
    let num = this.data.Gshow + 1
    cache.set('Gshow', {
      key: '步骤' + num,
      value: num
    })
    wx.switchTab({
      url: '/pages/userAddress/userAddress'
    })
  },
  //选择用户类型
  selecType(e) {
    let item = e.currentTarget.dataset.item
    if (item.type == 'user') return;
    wx.reLaunch({
      url: item.url
    })
  },
  //去详情
  goclass(e) {
    let item = e.currentTarget.dataset.item
    if (item.page) {
      urlUtil.to({
        pageAlias: item.page,
        options: item.params,
      })
      return;
    }
    if (item.web_url) {
      wx.navigateTo({
        url: '/pages/web/index/index?url=' + encodeURIComponent(item.web_url),
      })
    }
  },
  // 消息通知
  goInform() {
    wx.navigateTo({
      url: '/pages/userinfo/userInform/userInform'
    })
  },
  // 未读获取消息通知
  getInform() {
    home.unread({
      data: {},
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
        let data = res.data.data
        // console.log(data);
        this.setData({
          informmsg: data
        })
      }
    })
  },
  // 表单跳转
  operation(e) {
    if(this.data.Gshow == 6) {
      this.nextT()
      return;}
    let item = e.currentTarget.dataset.item
   wx.navigateTo({
     url: item.url,
   })
  },
  // 去周边消息详情页面
  godils(e) {
    let id = e.currentTarget.dataset.item.id
    home.surroundingDetails({
      data: {
        id: id
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
        let content = {
          title: res.data.data.title,
          content: res.data.data.content
        }
        app.redInfo = content
        this.newsRead(res.data.data.id)
        wx.navigateTo({
          url: '/pages/InformationDetails/InformationDetails'
        })
      }
    })
  },

  	//阅读统计
    newsRead(id){
      home.newsRead({
        data:{id:id},
        fail: () => {
          wx.showToast({
            title: '网络错误',
            icon: 'none'
          })
        },
        success: (res) => {
          if (res.statusCode != 200) return
          if (res.data.code != 200) return
          // console.log(res.data.data.data);
        },
      })
    },

  // 查看社区新闻详情
  goComm(e) {
    let id = e.currentTarget.dataset.item.id
    home.NewsDils({
      data: {
        id: id
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
        // console.log(res.data.data);
        let content = {
          title: res.data.data.title,
          content: res.data.data.content
        }
        app.redInfo = content
        wx.navigateTo({
          url: '/pages/InformationDetails/InformationDetails'
        })
      }
    })
  },
  //社区资讯 查看详情
  lookup(e) {
    home.infordils({
      data: {
        id: e.currentTarget.dataset.item.id
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
        let content = {
          title: res.data.data.title,
          content: res.data.data.content
        }
        app.redInfo = content
        wx.navigateTo({
          url: '/pages/InformationDetails/InformationDetails'
        })
      }
    })
  },
  // 关闭视频
  close() {
    this.setData({
      paly: false
    })
  },
  // 点击轮播图
  addswiper(e) {
    let movie = e.currentTarget.dataset.item
    if (movie.video) {
      this.setData({
        videoUrl: movie.video,
        cover: movie.image,
        paly: true
      })
      return;
    } 
    if(movie.page) {
      urlUtil.to({
        pageAlias: movie.page,
        options: movie.params,
      })
      return;
    }
    if(movie.web_url){
      wx.navigateTo({
        url : '/pages/web/index/index?url='+encodeURIComponent(movie.web_url),
      })
    }
  },
  // 显示物业外卖
  ShowType() {
    this.setData({
      isShowType: !this.data.isShowType
    })
  },
  // 输入框输入值
  inputchange(e) {
    this.setData({
      value: e.detail.value
    })
  },
  // 搜索
  confirm() {
    if(!this.data.value) return;
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
          list: res.data.data
        })
      },
    })
  },

  // 轮播图index
  onchange: function (e) {
    this.setData({
      current: e.detail.current
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
          title: '网络错误',
          icon: 'none'
        })
      },
      success: (res) => {
        this.stopRefreshIcon()
        if (res.statusCode != 200) return
        if (res.data.code != 200) return
        this.setData({
          clalists: res.data.data
        })
      },
    })
  },

  // 社区资讯数据
  Datainfo() {
    home.infortion({
      data: {
        page: 1,
        pageSize: 1
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
          infoloctext: res.data.data.data
        })
      },
    })
  },

  //社区新闻
  comgetData() {
    home.CommunityNews({
      data: {
        page: 1,
        pageSize: 1
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
        this.setData({
          newData: data
        })
      }
    })
  },

  //周边消息
  pergetData() {
    home.news({
      data: {
        page: 1,
        pageSize: 2
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
          item.created_at = item.created_at.slice(0, 10)
        })
        this.setData({
          perlocdata: data
        })

      },
    })
  },

  // 下拉刷新
  stopRefreshIcon() {
    if (this.data.showPullDownRefreshIcon == false) {
      wx.stopPullDownRefresh();
      this.setData({
        showPullDownRefreshIcon: true
      })
    }
  },

  onReady: function () {
    //  轮播图数据
    this.Chart()

    //分类数据
    this.Calss()

    //社区资讯数据
    this.Datainfo()

    //社区新闻
    this.comgetData()

    //周边消息
    this.pergetData()

  },

  



  onShow: function () {
    if (cache.get("Gshow")) {
      this.setData({
        Gshow: cache.get("Gshow").value
      })
      wx.hideTabBar()
      if (cache.get("Gshow").value == 0) {
        wx.showModal({
          title: '提示',
          content: '我们将为您开启新手指导教程',
          cancelText: '跳过',
          success: (res) => {
            if (res.confirm) {
              this.setData({
                Gshow: this.data.Gshow + 1
              })
              cache.set('Gshow', {
                key: '步骤' + this.data.Gshow,
                value: this.data.Gshow
              })
            }
            if (res.cancel) {
              cache.set('first', true)
              cache.forget('Gshow')
              this.setData({
                Gshow: null
              })
              wx.showTabBar()
            }
          }
        })
      }
    }else{ 
      wx.showTabBar()
      }
    this.setData({
      value: '',
      isShowType: false
    })
    //消息通知
    this.getInform()
    let user = cache.get('jwt')
    if (user) {
      this.setData({
        user: {}
      })
    } else {
      this.setData({
        user: null
      })
    }
  },
  onHide() {
    this.setData({
      Gshow: null,
      idx : 0
    })
  },
  // 下拉刷新
  onPullDownRefresh() {
    this.setData({
      showPullDownRefreshIcon: false
    })
    this.Chart()
    this.Calss()
    this.Datainfo()
    this.comgetData()
    this.pergetData()
    this.getInform()
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
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
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  onShareAppMessage(e) {
    // console.log(e);
   },
    //分享给朋友圈
  onShareTimeline(){

   },
})