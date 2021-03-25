// pages/classification/motion/motion.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  	till: ['全部', '健身馆', '篮球', '羽毛球'],
				idx: 0,
				getData: [],
				locadata: [{
						image: 'https://oss.kuaitongkeji.com/static/img/app/classification/motion/logo1.png',
						name: 'VIGOR LIFE健身训练中心（复地御香...）',
						score: '5.0',
						Price: '￥1035/人',
						Views: '5624人浏览',
						titel: ' 私教工作室   ',
						address: ' 华阳',
						label: '健身爱好者，力量训练爱好者的天堂',
						tag: 'https://oss.kuaitongkeji.com/static/img/app/classification/motion/tag1.png'
					},
					{
						image: 'https://oss.kuaitongkeji.com/static/img/app/classification/motion/logo2.png',
						name: '泳力健身游泳中心',
						score: '4.0',
						Price: '￥60/人',
						Views: '5587人浏览',
						titel: ' 游泳 ',
						address: ' 华阳',
						label: '去过恒温泳池数一数二的了',
					},
					{
						image: 'https://oss.kuaitongkeji.com/static/img/app/classification/motion/logo3.png',
						name: '99PARK篮球公园',
						score: '3.5',
						Price: '￥20/人',
						Views: '87865人浏览',
						titel: ' 篮球    ',
						address: ' 航空港',
						label: '免费停车',
					},
					{
						image: 'https://oss.kuaitongkeji.com/static/img/app/classification/motion/logo4.png',
						name: '弘羽羽毛球馆',
						score: '4.0',
						Price: '暂无均价',
						Views: '2896人浏览',
						titel: ' 羽毛球  ',
						address: ' 高新区',
						label: '健身爱好者，力量训练爱好者的天堂',
						tag: 'https://oss.kuaitongkeji.com/static/img/app/classification/motion/tag2.png'
					}
				],
				locadata1: [{
						image:'https://oss.kuaitongkeji.com/static/img/app/classification/motion/logo5.png',
						name: '原始 Fitness',
						score: '4.0',
						Price: '￥60/人',
						Views: '2587人浏览',
						titel: ' 私教工作室 ',
						address: ' 华阳',
						label: '是周围数个健身房数一数二的质量了',
					},
					{
						image: 'https://oss.kuaitongkeji.com/static/img/app/classification/motion/logo1.png',
						name: 'VIGOR LIFE健身训练中心（复地御香...）',
						score: '5.0',
						Price: '￥1035/人',
						Views: '5624人浏览',
						titel: ' 私教工作室   ',
						address: ' 华阳',
						label: '健身爱好者，力量训练爱好者的天堂',
						tag: 'https://oss.kuaitongkeji.com/static/img/app/classification/motion/tag1.png'
					},
				],
				locadata2: [{
					image: 'https://oss.kuaitongkeji.com/static/img/app/classification/motion/logo3.png',
					name: '99PARK篮球公园',
					score: '3.5',
					Price: '￥20/人',
					Views: '87865人浏览',
					titel: ' 篮球    ',
					address: ' 航空港',
					label: '免费停车',
				}, ],
				locadata3: [{
					image: 'https://oss.kuaitongkeji.com/static/img/app/classification/motion/logo4.png',
					name: '弘羽羽毛球馆',
					score: '4.0',
					Price: '暂无均价',
					Views: '2896人浏览',
					titel: ' 羽毛球  ',
					address: ' 高新区',
					label: '健身爱好者，力量训练爱好者的天堂',
					tag: 'https://oss.kuaitongkeji.com/static/img/app/classification/motion/tag2.png'
				}]
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