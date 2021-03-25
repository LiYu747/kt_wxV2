// pages/classification/deliciousFood/deliciousFood.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    till: ['全部', '火锅', '烧烤', '快餐小吃'],
    idx: 0,
    getData:[],
    locadata: [{
        image: 'https://oss.kuaitongkeji.com/static/img/app/classification/deliciousFood/logo1.png',
        name: '大鱼海塘纸包烤鱼（海昌路店）',
        score: '4.2',
        Price: '￥49/人',
        Views: '5624人浏览',
        titel:' 烤鱼    ',
        address:' 天府新区',
        label:'掌柜说：全家都能吃的“经典蒜香”烤鱼。',
      },
      {
        image: 'https://oss.kuaitongkeji.com/static/img/app/classification/deliciousFood/logo2.png',
        name: '乡村基（华阳家乐福店）',
        score: '3.2',
        Price: '￥60/人',
                    Views: '5587人浏览',
        titel:' 快餐简餐   ',
        address:' 华阳',
          tag:'https://oss.kuaitongkeji.com/static/img/app/classification/deliciousFood/tag1.png' 
      },
      {
        image: 'https://oss.kuaitongkeji.com/static/img/app/classification/deliciousFood/logo3.png',
        name: '安德鲁森（复地御香山店）',
        score: '3.0',
        Price: '￥20/人',
        Views: '87865人浏览',
        titel:' 面包蛋糕   ',
        address:'    华阳    ',
        label:'从这边出去比较方便',
      },
      {
        image: 'https://oss.kuaitongkeji.com/static/img/app/classification/deliciousFood/logo4.png',
        name: '锅首老火锅（华阳店）',
        score: '5.0',
        Price: '暂无均价',
        Views: '2896人浏览',
        titel:' 火锅  ',
        address:' 高新区',
        label:'主要价格很合理',
      },
    ],
    locadata1: [{
        image: 'https://oss.kuaitongkeji.com/static/img/app/classification/deliciousFood/logo5.png',
        name: '稳拈市井老灶火锅',
        score: '4.0',
        Price: '￥49/人',
        Views: '5024人浏览',
        titel:' 四川火锅     ',
        address:' 华阳',
        label:'“餐厅环境优美，每处细节都特别用心”',
      },
      {
        image: 'https://oss.kuaitongkeji.com/static/img/app/classification/deliciousFood/logo6.png',
        name: '牛杂火锅',
        score: '3.2',
        Price: '￥60/人',
            Views: '5587人浏览',
        titel:' 火锅     ',
        address:' 华阳',
        label:'“只能用软嫩耙糯来形容，安逸得板”'
      },
      {
        image: 'https://oss.kuaitongkeji.com/static/img/app/classification/deliciousFood/logo4.png',
        name: '锅首老火锅（华阳店）',
        score: '5.0',
        Price: '暂无均价',
        Views: '2896人浏览',
        titel:' 火锅 ',
        address:' 高新区',
        label:'主要价格很合理',
      },
    ],
      locadata2: [{
          image: 'https://oss.kuaitongkeji.com/static/img/app/classification/deliciousFood/logo7.png',
          name: '宜宾把把烧',
          score: '4.0',
          Price: '￥19/人',
          Views: '524人浏览',
          titel:' 烧烤烤串      ',
          address:' 华阳',
          label:'“只能用软嫩耙糯来形容，安逸得板”',
        },
        {
          image: 'https://oss.kuaitongkeji.com/static/img/app/classification/deliciousFood/logo8.png',
          name: '乐山刘记烧烤（华阳店）',
          score: '3.2',
          Price: '￥26/人',
              Views: '557人浏览',
          titel:' 烧烤     ',
          address:' 华阳',
          label:'“走在门口很有礼貌的们你吃烧烤吗”'
        },
      ],
    locadata3: [{
        image: 'https://oss.kuaitongkeji.com/static/img/app/classification/deliciousFood/logo9.png',
        name: '炸小明',
        score: '4.0',
        Price: '￥39/人',
        Views: '324人浏览',
        titel:' 小吃快餐       ',
        address:'  天府新区',
        label:'“小龙虾推荐香辣味，48元一斤，很实在”',
      },
    ]
  },
   

  add(e) {
    let index = e.currentTarget.dataset.index
    let arr = []
    if (index == 0) {
      arr = this.data.locadata
    }
    if (index == 1) {
      arr = this.data.locadata1
    }
    if (index == 2) {
      arr = this.data.locadata2
    }
    if (index == 3) {
      arr = this.data.locadata3
    }
    this.setData({
      idx : index ,
      getData : arr
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

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      getData :  this.data.locadata	
    })
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})