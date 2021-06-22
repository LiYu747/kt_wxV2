// pages/classification/motion/motion.js
import home from "../../../vendor/home/home.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
		value: "",
		ISseach: false,
		hasMore: true,
		isLoding: false,
		page: 1,
		pageSize:15,
		lists: [],
		text:'',
		noSeacht:''
	},
	//取消
	cancel(){
		this.setData({
			value : '',
			ISseach : false,
			page : 1,
			lists : [],
		})
		this.getData()
	},
	//搜索
	search() {
		this.setData({
			text : '',
			ISseach : true,
			page : 1,
			lists : [],
			noSeacht:''
		})
		this.getData()
	},
	//获取输入框的值
	Onchange(e){ 
		this.setData({
		  value : e.detail.value
		})
	},
	//获取数据
	getData() {
		this.setData({
			isLoding : true
		})
		home.motionshop({
			data: {
				kw: this.data.value,
				page:this.data.page,
				pageSize:this.data.pageSize
			},
			fail: () => {
				this.setData({
					isLoding : false
				})
				wx.showToast({
					title: "网络错误",
					icon: "none"
				})
			},
			success: (res) => {
				this.setData({
					isLoding : false
				})
				if (res.statusCode != 200) {
					wx.showToast({
						title: "网络出错了",
						icon: "none"
					})
					return;
				}
				if (res.data.code != 200) {
					wx.showToast({
						title: res.data.msg,
						icon: "none"
					})
					return;
				}
				let data = res.data.data
				if(data.data.length == 0){
					this.setData({
						noSeacht : '没有您搜索的内容'
					})
				}
				this.setData({
					hasMore :  data.next_page_url ? true : false,
					page :  data.current_page + 1,
					lists : this.data.lists.concat(data.data)
				})
			}
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
   this.getData()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
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
		this.setData({
			text : '没有更多了'
		})
		if (this.data.isLoding == true || this.data.hasMore == false) return;
		this.getData();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})