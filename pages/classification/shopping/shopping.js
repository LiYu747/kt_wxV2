// pages/classification/shopping/shopping.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    till: ['全部', '衣服', '鞋子', '家具'],
    idx: 0,
    getData: [],
    locadata: [{
        image: ('https://oss.kuaitongkeji.com/static/img/app/classification/shopping/logo1.png'),
        name: '岱芙服装店',
        score: '3.5',
        distance: '11.3km',
        Views: '5624人浏览',
        label: '服装      天府新区',
        Crunchies: '”店的位置不错，环境整洁时尚“',
      },
      {
        image: ('https://oss.kuaitongkeji.com/static/img/app/classification/shopping/logo5.png'),
        name: '名创优品',
        score: '4.0',
        distance: '7.4km',
        Views: '1768人浏览',
        label: '居家日常      高新区',
        Crunchies: '“很喜欢在名创优品里面买东西，质量不错”',
      },
      {
        image: ('https://oss.kuaitongkeji.com/static/img/app/classification/shopping/logo8.png'),
        name: '禾木艺景.品质整装',
        score: '5.0',
        distance: '14km',
        Views: '4578人浏览',
        label: '装修设计      高新区',
        Crunchies: '”性价比很高的一家装修公司“',
      },
      {
        image: ('https://oss.kuaitongkeji.com/static/img/app/classification/shopping/logo2.png'),
        name: '海澜之家',
        score: '3.5',
        distance: '3.6km',
        Views: '3268人浏览',
        label: '服装      天府新区',
        Crunchies: '”店的位置不错，环境整洁时尚“',
      },
      {
        image: ('https://oss.kuaitongkeji.com/static/img/app/classification/shopping/logo3.png'),
        name: '庄贤服装设计工作室',
        score: '4.2',
        distance: '12.4km',
        Views: '4218人浏览',
        label: '其他兴趣生活      高新区',
        Crunchies: '”体验了工业缝纫机，能玩缝纫机就很开心“',
      },
      {
        image: ('https://oss.kuaitongkeji.com/static/img/app/classification/shopping/logo7.png'),
        name: 'U家工场.全案美学整装',
        score: '5.0',
        distance: '14km',
        Views: '15768人浏览',
        label: '装修设计      高新区',
        Crunchies: '专业上门验房+量房',
      },
    ],
    locadata1: [{

        image: ('https://oss.kuaitongkeji.com/static/img/app/classification/shopping/logo1.png'),
        name: '岱芙服装店',
        score: '3.5',
        distance: '11.3km',
        Views: '5624人浏览',
        label: '服装      天府新区',
        Crunchies: '”店的位置不错，环境整洁时尚“',
      },
      {
        image: ('https://oss.kuaitongkeji.com/static/img/app/classification/shopping/logo2.png'),
        name: '海澜之家',
        score: '3.5',
        distance: '3.6km',
        Views: '3268人浏览',
        label: '服装      天府新区',
        Crunchies: '”店的位置不错，环境整洁时尚“', 
      },
      {
        image: ('https://oss.kuaitongkeji.com/static/img/app/classification/shopping/logo3.png'),
        name: '庄贤服装设计工作室',
        score: '4.2',
        distance: '12.4km',
        Views: '4218人浏览',
        label: '其他兴趣生活      高新区',
        Crunchies: '”体验了工业缝纫机，能玩缝纫机就很开心“',
      },
      {
        image: ('https://oss.kuaitongkeji.com/static/img/app/classification/shopping/logo4.png'),
        name: '观奇洋服.西服定制中心',
        score: '3.5',
        distance: '7.5km',
        Views: '3761人浏览',
        label: '西服定制      华阳',
        Crunchies: '”衣服的做工和边角都处理的不错“',
      },
    ],
    locadata2: [{
        image: ('https://oss.kuaitongkeji.com/static/img/app/classification/shopping/logo5.png'),
        name: '名创优品',
        score: '4.0',
        distance: '7.4km',
        Views: '1768人浏览',
        label: '居家日常      高新区',
        Crunchies: '“很喜欢在名创优品里面买东西，质量不错”',
      },
      {
        image: ('https://oss.kuaitongkeji.com/static/img/app/classification/shopping/logo6.png'),
        name: '卓诗尼',
        score: '3.5',
        distance: '20km',
        Views: '5768人浏览',
        label: '鞋靴      春熙路',
        Crunchies: '“装修好看，特别是里面的灯光特别温馨”',
      },
    ],
    locadata3: [{
        image: ('https://oss.kuaitongkeji.com/static/img/app/classification/shopping/logo7.png'),
        name: 'U家工场.全案美学整装',
        score: '5.0',
        distance: '14km',
        Views: '15768人浏览',
        label: '装修设计      高新区',
        Crunchies: '专业上门验房+量房',
      },
      {
        image: ('https://oss.kuaitongkeji.com/static/img/app/classification/shopping/logo8.png'),
        name: '禾木艺景.品质整装',
        score: '5.0',
        distance: '14km',
        Views: '4578人浏览',
        label: '装修设计      高新区',
        Crunchies: '”性价比很高的一家装修公司“',
      },
      {
        image: ('https://oss.kuaitongkeji.com/static/img/app/classification/shopping/logo9.png'),
        name: '致美优家',
        score: '4.5',
        distance: '14km',
        Views: '4578人浏览',
        label: '装修设计      高新区',
        Crunchies: '精装房上门验房检测',
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
      getData : arr,
      idx : index
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
      getData : this.data.locadata
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