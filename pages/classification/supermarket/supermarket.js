// pages/classification/supermarket/supermarket.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    till: ['生鲜超市', '水果超市', '24小时', '宠物用品'],
				idx: 0,
				getData:[],
				locadata: [{
						image: 'https://oss.kuaitongkeji.com/static/img/app/classification/supermarket/92.png',
						name: '鲜果汇（广福地铁站店）',
						score: '4.9',
						images: [
							{
								img:'https://oss.kuaitongkeji.com/static/img/app/classification/supermarket/banlala.png',
								titel:'香甜香蕉'
							},
							{
								img:'https://oss.kuaitongkeji.com/static/img/app/classification/supermarket/mang.png',
								titel:'鲜切芒果'
							},
						],
						time: '24h营业',
						Views: '5624人浏览'
					},
					{
						image: 'https://oss.kuaitongkeji.com/static/img/app/classification/supermarket/hongq.png',
						name: '红旗连锁（华阳海昌路店）',
						score: '暂无评分',
						images: [
							{
								img:'https://oss.kuaitongkeji.com/static/img/app/classification/supermarket/coco.png',
								titel:'可口可乐'
							},
							{
								img:'https://oss.kuaitongkeji.com/static/img/app/classification/supermarket/kamgsf.png',
								titel:'藤椒牛肉面'
							},			
						],
						time: '24h营业',
						Views: '5587人浏览'
					},
					{
						image: 'https://oss.kuaitongkeji.com/static/img/app/classification/supermarket/rongc.png',
						name: '蓉城万家（天府新区店）',
						score: '5.0',
						images: [
							{
								img:'https://oss.kuaitongkeji.com/static/img/app/classification/supermarket/wahaha.png',
								titel:'AD钙奶' 
							},
							{
								img:'https://oss.kuaitongkeji.com/static/img/app/classification/supermarket/zhi.png',
								titel:'本色纸浆抽纸'
							},	
						],
						time: null,
						Views: '87865人浏览'
					},
				],
			    locadata1: [{
			    		image: 'https://oss.kuaitongkeji.com/static/img/app/classification/supermarket/logo1.png',
			    		name: '鲜果汇（广福地铁站店）',
			    		score: '4.5',
			    		images: [
							{
								img:'https://oss.kuaitongkeji.com/static/img/app/classification/supermarket/logo1.1.png',
								titel:'金桔'
							},
							{
								img:'https://oss.kuaitongkeji.com/static/img/app/classification/supermarket/logo1.2.png',
								titel:'菠萝蜜'
							},
			    		],
			    		Views: '5004人浏览'
			    	},
					{
							image:'https://oss.kuaitongkeji.com/static/img/app/classification/supermarket/92.png',
							name: '鲜果汇（广福地铁站店）',
							score: '4.9',
							images: [
								{
									img:'https://oss.kuaitongkeji.com/static/img/app/classification/supermarket/banlala.png',
									titel:'香甜香蕉'
								},
								{
									img:'https://oss.kuaitongkeji.com/static/img/app/classification/supermarket/mang.png',
									titel:'鲜切芒果'
								},
							],
							Views: '5624人浏览'
						},
			    ],
			    locadata2: [{
						image:'https://oss.kuaitongkeji.com/static/img/app/classification/supermarket/92.png',
						name: '鲜果汇（广福地铁站店）',
						score: '4.9',
						images: [
							{
								img:'https://oss.kuaitongkeji.com/static/img/app/classification/supermarket/banlala.png',
								titel:'香甜香蕉'
							},
							{
								img:'https://oss.kuaitongkeji.com/static/img/app/classification/supermarket/mang.png',
								titel:'鲜切芒果'
							},
						],
						time: '24h营业',
						Views: '5624人浏览'
					},
					{
						image:'https://oss.kuaitongkeji.com/static/img/app/classification/supermarket/hongq.png',
						name: '红旗连锁（华阳海昌路店）',
						score: '暂无评分',
						images: [
							{
								img:'https://oss.kuaitongkeji.com/static/img/app/classification/supermarket/coco.png',
								titel:'可口可乐'
							},
							{
								img:'https://oss.kuaitongkeji.com/static/img/app/classification/supermarket/kamgsf.png',
								titel:'藤椒牛肉面'
							},			
						],
						time: '24h营业',
						Views: '5587人浏览'
					},
			    ],
			    locadata3: [{
			    		image:'https://oss.kuaitongkeji.com/static/img/app/classification/supermarket/logo2.png',
			    		name: '鲜果汇（广福地铁站店）',
			    		score: '4.5',
			    		images: [
			    			{
			    				img:'https://oss.kuaitongkeji.com/static/img/app/classification/supermarket/logo2.1.png',
			    				titel:'低盐猫粮'
			    			},
			    			{
			    				img:'https://oss.kuaitongkeji.com/static/img/app/classification/supermarket/logo2.2.png',
			    				titel:'逗猫棒'
			    			},
			    		],
			    		Views: '5624人浏览'
			    	},
			    	{
			    			image:'https://oss.kuaitongkeji.com/static/img/app/classification/supermarket/logo3.png',
			    			name: '萌宠宠物店',
			    			score: '4.1',
			    			images: [
			    			{
			    				img:'https://oss.kuaitongkeji.com/static/img/app/classification/supermarket/logo3.1.png',
			    				titel:'不锈钢猫盆'
			    			},
			    			{
			    				img:'https://oss.kuaitongkeji.com/static/img/app/classification/supermarket/logo3.2.png',
			    				titel:'猫砂'
			    			},
			    			],
			    			Views: '2424人浏览'
			    		},
			    ],
  },
  

  add(e) {
    let index = e.currentTarget.dataset.index
    let arr = []
    if(index==0){
      arr = this.data.locadata
    }
    if(index==1){
      arr = this.data.locadata1
    }
    if(index == 2){
      arr = this.data.locadata2
    }
    if(index == 3){
      arr = this.data.locadata3
    }
    this.setData({
      idx : index,
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