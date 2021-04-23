// components/navigation-bar/navigation-bar.js
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    defaultData: {
      type: String,
      value: ""
  }
  },

  /**
   * 组件的初始数据
   */
  data: {
    navBarHeight: app.globalData.navBarHeight,
    menuBotton: app.globalData.menuBotton,
    menuHeight: app.globalData.menuHeight,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    
  }
  
})
