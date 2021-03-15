// components/tabbar/subbotn/subbotn.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
   ID:{
     type: String
   }
  },

  /**
   * 组件的初始数据
   */
  data: {
    icondata:[
      {
        icon:'https://oss.kuaitongkeji.com/static/img/app/forum/home2.png',
        titel:'论坛主页',
        },
        {
         icon:'https://oss.kuaitongkeji.com/static/img/app/forum/photo1.png',
          url:`/pages/communityForum/release/release`
        },
        {
        icon:'https://oss.kuaitongkeji.com/static/img/app/forum/my1.png',
        titel:'我的',
        url:`/pages/communityForum/submy/submy`
        },
        ],
    
  },

  /**
   * 组件的方法列表
   */
  methods: {
    add(e){
      console.log()
      let item = e.currentTarget.dataset.item
      if(!item.url) return; 
      wx.redirectTo({
        url:item.url + "?id=" + this.properties.ID
      })
    }
  }
})
