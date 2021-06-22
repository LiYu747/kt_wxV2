//测试域名
// let host = 'https://test.kuaitongkeji.com/'  
//本地开发域名
// let host = 'http://chat.local.cn/'; 
let host = 'https://v2.kuaitongkeji.com/';       
let apiPath = host + 'api/';

module.exports = { 

	host: host, 
 
	client: {

		config: apiPath + 'open/config/base',   

		reg: apiPath + 'auth/client',

		// version: {
		// 	latest: apiPath + 'app/version/latest',
		// }
	},

	services: {
		// 登录验证码
		sms: {
			userLoginCode: host + 'services/sms/send',
		},
		// 上传文件
		file: {
			upload: host + 'services/file/upload',
		}
	},

	user: {
		// 登录
		auth: {
			login: apiPath + 'auth/user/login'
		},
		// 注册
		register: {
			regis: apiPath + 'auth/user/reg'
		},
		// 个人信息
		userdeta: {
			userdetails: apiPath + 'user/profile'
		},
		// 修改个人信息
		userupdate: {
				// 修改个人信息
			update: apiPath + 'user/baseInfo',
			
			// 更新实名认证信息
			updataRealname : apiPath + 'user/realNameInfo',
			
			//设置新密码
			steNewpaw : apiPath + 'user/setPassword',

			//找回密码
			findPaw : apiPath + 'auth/user/forgotPassword'
			
		},


	},

	home: {
			
		// 轮播图
		adPos: {
			// 广告位
			rotationChart: apiPath + 'open/ad/pos/show',
			
			// 未读消息数量
			unread : apiPath + 'user/msg/unread',
			
			// 标记所有未读为已读
			allRead : apiPath + 'user/msg/readAll',
			
			// 消息通知
			userMessage : apiPath + 'user/msg',
			
			// 标为已读
			userRead  : apiPath + 'user/msg/read',

			//删除消息
			delMsg : apiPath + 'user/msg'
		},
			
		// 分类接口
		classifyPost : {
			//发布出租房消息
			releaseRent: apiPath + 'user/house/rental',

			// 发布出售房屋信息
			releaseSellers: apiPath + 'user/house/sale',

			// 出租房列表
			allRoom: apiPath + 'open/house/rental',

			// 出租房信息详情
			roomDateils: apiPath + 'open/house/rental/show',
			
			// 出租房浏览统计
			rentalView : apiPath + 'open/house/rental/view',

			// 查看平台所有房屋出售信息
			sellRecords: apiPath + 'open/house/sale',

			// 出售房屋的记录详情
			sellDetails: apiPath + 'open/house/sale/show',
             
			//售房信息浏览统计
			 saleView : apiPath + 'open/house/sale/view',
			 
			// 自己发布的所有出租房信息
			postrentMsg: apiPath + 'user/house/rental',

			// 查看自己发布的房屋出售记录
			postsellMsg: apiPath + 'user/house/sale',

			// 出租房详情
			rentDils: apiPath + 'user/house/rental/show',

			// 房屋出售记录的详情
			saleDils: apiPath + 'user/house/sale/show',

			// 设置出租房可见性
			rentShow: apiPath + 'user/house/rental/online',

			//更新租房数据
			updataRoom: apiPath + 'user/rental',

			//删除租房数据
			delrenRoom: apiPath + 'user/house/rental',

			// 出售记录的可见性
			saleShow: apiPath + 'user/house/sale/online',


			//删除卖房
			delSale: apiPath + 'user/house/sale',
			
			//运动店铺
			motionshop : apiPath + 'open/shop'
		},


		// 社区资讯
		infortion: {
			// 社区资讯
			infor: apiPath + 'open/news/community',
			// 资讯详情
			infordils: apiPath + 'open/news/community/show',
			// 小区新闻
			CommunityNews: apiPath + 'open/news/village',
			// 小区新闻详情
			NewsDils: apiPath + 'open/news/village/show',	
		},

		// 周边
		news: {
			// 周边
			peripheralNews: apiPath + 'open/news',
			// 周边详情
			surroundingDetails: apiPath + 'open/news/show',
			//阅读统计
			newsRead : apiPath + 'open/news/read'
		},

		// 申请入住
		applecheckin: {
			apple: apiPath + 'user/house/moveInApply',
			// 申请记录
			applerecord: apiPath + 'user/house/moveInApply',
			// 记录详情
			recordDils: apiPath + 'user/house/moveInApply/show',
				// 审核入住申请
				audit : apiPath + 'user/moveInApply/deal',
			//房东查看入住申请
			userLook :  apiPath + 'user/moveInApply/detail'
		},

		//拜访申请Visit record
		visitLog: {
			// 拜访记录 && 申请拜访
			apply: apiPath + 'user/visit',

			// 最新拜访申请
			newapply: apiPath + 'user/visitLog/latestValid',

			// 拜访记录详情
			details: apiPath + 'user/visit/show',

			// 出行记录
			travelRecords: apiPath + 'user/backHome'

		},

		//来访记录
		Visitrecord: {
			visitors: apiPath + 'user/visit/visitors',

			// 来访详情
			details: apiPath + 'user/visit/visitor/show',

			// 处理来访申请
			handlevisit: apiPath + 'user/visit/visitor/deal'
		},


		// 二维码
		qrcode: {
			obtaincode: apiPath + 'user/inOut/getQr'
		}

	},

	// 小区
	village: {
		vagelist: {
			// 小区列表
			list: apiPath + 'village/village',
			selectLists: apiPath + 'village/village/selectLists',

			// 搜索小区
			searchVill : apiPath + 'open/village/search',

			// 小区公告
			Notice: apiPath + 'open/village/notice',

			// 公告详情
			Noticeshow: apiPath + 'open/village/notice/show',

			// 小区展示信息
			displayInformation: apiPath + 'open/village/show',

			// 小区内的帖子
			communityPost: apiPath + 'open/village/post',

			//发布帖子
			releasePost: apiPath + 'open/village/post',

			// 帖子详情
			postDetails: apiPath + 'open/village/post/show',

			// 帖子的评论
			postComments: apiPath + 'open/village/post/comment',

			// 发布评论
			relComments: apiPath + 'open/village/post/comment',
			
			//删除帖子
			deluserpost : apiPath + 'user/post', 
			
			//修改帖子可见性
			visiblePost : apiPath + 'user/villageTribune/visible',

			//自己发布的帖子
			SelfComments: apiPath + 'user/post',

			// 自己发布的帖子评论
			SelfPost: apiPath + 'user/post/comment',
			
			//自己发布的帖子详情
			MypostDeta : apiPath + 'user/post/show',

			//默认的栏目列表
			DefaultColumnList: apiPath + 'open/village/post/cate',

			//删除自己帖子的评论
			deluserPost : apiPath + "open/village/post/comment/remove",
			
			//删除自己的评论
			delPost : apiPath + 'user/post/comment'
		},


	},

	// 地址
	address: {
		alladd: {
			// 用户的所有住址
			list: apiPath + 'user/house',
			
			// 某一个住址的详细信息
			listdetails: apiPath + 'user/house/show',
			
			//查看住所内的所有成员
			lookMember  : apiPath + 'user/house/members',
			
			// 查找用户是否存在
			findUser : apiPath + 'open/user/search',
			
			//添加住所成员
			pushMember : apiPath + 'user/house/addMate',
			
			//成员的详情
			memberDetails : apiPath + 'user/house/memberInfo',
			
			// 更新成员信息权限
			updateMember : apiPath + 'user/house/editMember',
			
			// 移除某个成员
			 deleteMember  : apiPath + 'user/house/removeMate',

			 	//物业留言反馈
			feedback : apiPath + 'open/village/feedback'
			
		},
		//预约电梯
		bookingElevator: {
			booking: apiPath + 'user/house/subElevator'
		},


	},
	// 导航
	Navigation: {
		Navmap: apiPath + 'app/config'
	},

	// 小区物业管理
	propertyManagement: {
      
	    // 小区进出记录
		recordOfAccess : host + 'village_staff/village/inOutRecord',
		
		//入住申请所有记录
		checkinRecord : apiPath + 'villageStaff/house/moveInApply',
		
		//入住申请记录详情
	    checkinDetails : apiPath + 'villageStaff/house/moveInApply/show',
		
		// 审核某条记录
		 auditRecord : apiPath + 'villageStaff/house/moveInApply/verify',
		 
		 //获取所有帖子
		 allPost : apiPath + 'villageStaff/post',
		 
		 //帖子详情
		 postDetails : apiPath + 'villageStaff/post/show',
		 
		 // 审核帖子
		 ReviewPosts : apiPath + 'villageStaff/post/verify',
		 
		 // 小区内的住户
		 allResident : apiPath + 'villageStaff/house',

		 //住户详情
		ResidentD: apiPath + 'villageStaff/house/show',
		 
		 //查看申请记录的进度(GET)&&//申请成为(POST)
		 applicationProgress : apiPath + 'user/courier/apply',
		 
		 //查看自己的信息
		 lookMymsg : apiPath + 'user/courier/show',
		 
		 // 通行二维码
		 passQr : apiPath + 'user/inOut/getQr',

		 //管理的小区信息
		getVillageinfo : apiPath + "villageStaff/village/info",
	}
}
