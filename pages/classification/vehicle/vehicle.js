// pages/classification/vehicle/vehicle.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  	till: ['全部', '维修4s店', '停车场', '加油站'],
				idx: 0,
				getData: [],
				locadata: [{
						image: 'https://oss.kuaitongkeji.com/static/img/app/classification/vehicle/logo1.png',
						name: '新希望国际B座汇泊停车场',
						Views: '5842人浏览',
						xxadd: '地址：四川省成都市武侯区桂溪街道萃华路新希望国际B座',
						Monthly: '月租：700-1500 '
					},
					{
						image: ('https://oss.kuaitongkeji.com/static/img/app/classification/vehicle/logo2.png'),
						name: '天府华星锦业奔驰4s店',
						score: '5.0',
						Price: '暂无均价',
						Views: '21551人浏览',
						titel: ' 4s店',
						address: ' 华阳',
						tag: [
							('https://oss.kuaitongkeji.com/static/img/app/classification/vehicle/1.png'),
							('https://oss.kuaitongkeji.com/static/img/app/classification/vehicle/3.png'),
						]
					},
					{
						image: ('https://oss.kuaitongkeji.com/static/img/app/classification/vehicle/logo3.png'),
						name: '新元素奥迪（麓山大道店）',
						score: '4.5',
						Price: '暂无均价',
						Views: '21551人浏览',
						titel: ' 4s店 ',
						address: '    华阳    ',
						label: '“服务专业，环境没得说，高端大气上档次”',
					},
					{
						image: ('https://oss.kuaitongkeji.com/static/img/app/classification/vehicle/logo4.png'),
						name: '华阳天山加油站',
						score: '4.5',
						Price: '暂无均价',
						Views: '2896人浏览',
						titel: ' 加油站        ',
						address: ' 天府新区',
					},
				],
				locadata1: [{
					image: ('https://oss.kuaitongkeji.com/static/img/app/classification/vehicle/logo2.png'),
					name: '天府华星锦业奔驰4s店',
					score: '5.0',
					Price: '暂无均价',
					Views: '21551人浏览',
					titel: ' 4s店',
					address: ' 华阳',
					tag: [
						('https://oss.kuaitongkeji.com/static/img/app/classification/vehicle/1.png'),
						('https://oss.kuaitongkeji.com/static/img/app/classification/vehicle/3.png'),
					]
				}, ],
				locadata2: [{
					image: ('https://oss.kuaitongkeji.com/static/img/app/classification/vehicle/logo1.png'),
					name: '新希望国际B座汇泊停车场',
					Views: '5842人浏览',
					xxadd: '地址：四川省成都市武侯区桂溪街道萃华路新希望国际B座',
					Monthly: '月租：700-1500 '
				}, ],
				locadata3: [{
					image: ('https://oss.kuaitongkeji.com/static/img/app/classification/vehicle/logo4.png'),
					name: '华阳天山加油站',
					score: '4.5',
					Price: '暂无均价',
					Views: '2896人浏览',
					titel: ' 加油站        ',
					address: ' 天府新区',
				}, ]
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