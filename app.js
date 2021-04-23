//app.js
import cache from './vendor/cache/cache.js'
App({
  globalData: {
    navBarHeight: 0, // 导航栏高度
    menuRight: 0, // 胶囊距右方间距（方保持左、右间距一致）
    menuBotton: 0, // 胶囊距底部间距（保持底部间距一致）
    menuHeight: 0, // 胶囊高度（自定义内容可与胶囊高度保证一致）
},
  onLaunch: function () {
    const that = this;
    // 获取系统信息
    const systemInfo = wx.getSystemInfoSync();
    // 胶囊按钮位置信息
    const menuButtonInfo = wx.getMenuButtonBoundingClientRect();
    // 导航栏高度 = 状态栏到胶囊的间距（胶囊距上距离-状态栏高度） * 2 + 胶囊高度 + 状态栏高度
    that.globalData.navBarHeight = (menuButtonInfo.top - systemInfo.statusBarHeight) * 2 + menuButtonInfo.height + systemInfo.statusBarHeight;
    that.globalData.menuRight = systemInfo.screenWidth - menuButtonInfo.right;
    that.globalData.menuBotton = menuButtonInfo.top - systemInfo.statusBarHeight;
    that.globalData.menuHeight = menuButtonInfo.height;
    if(!cache.get('first')){
      cache.set('Gshow',{'key':'开启',value:0})
    }
    // #ifdef APP-PLUS
    if(cache.get('first')){
      cache.forget('Gshow')
    }
    // #endif

    const updateManager = wx.getUpdateManager() 
    updateManager.onCheckForUpdate(
      function(res){// 请求完新版本信息的回调            
      })
      updateManager.onUpdateReady(
          function(){
            wx.showModal({
                  title:'更新提示',
                  content:'新版本已经准备好，是否重启应用？',
                  success:function(res){
                      if(res.confirm){
                    // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启      
                          updateManager.applyUpdate()
                      }
                  }
             })
          }
        )
          updateManager.onUpdateFailed(
                function(){// 新的版本下载失败
                      wx.showModal({
                          title:'更新提示',
                          content:'新版本下载失败',
                          showCancel:false
                      })
                   }
          )
     
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
     
    
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    
     
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null
  },
  redInfo:{} ,//资讯详情
  userIscomment : 0, //判断用户是否在参与页面评论
  comeToVisit: 0, //判断是否有来访操作 
  myPostisDel: 0,//判断是否删除了我自己发布的帖子
  checkSeePass : '',//是否同意进行入住
  IsPostpass : '',//帖子是否通过
  roomIsDel : 0,//我发布的房屋是否删除
})