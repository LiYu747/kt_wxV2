import routes from '../request/routes.js';
import req from '../request/req.js';
class Home {
	// 轮播图
	chart(params) {
		params.url = routes.home.adPos.rotationChart;
		req.get(params);
	}

	// 消息通知
	userMessage(params) {
		params.url = routes.home.adPos.userMessage;
		req.get(params);
	}

	// 未读消息数量
	unread(params) {
		params.url = routes.home.adPos.unread;
		req.get(params);
	}

	// 标记所有未读为已读
	allRead(params) {
		params.url = routes.home.adPos.allRead;
		req.patch(params);
	}

	// 标为已读
	userRead(params) {
		params.url = routes.home.adPos.userRead;
		req.patch(params);
	}

	// 周边消息
	news(params) {
		params.url = routes.home.news.peripheralNews
		req.get(params)
	}

	//周边详情
	surroundingDetails(params) {
		params.url = routes.home.news.surroundingDetails
		req.get(params)
	}

	// 社区资讯
	infortion(params) {
		params.url = routes.home.infortion.infor
		req.get(params)
	}

	// 资讯详情
	infordils(params) {
		params.url = routes.home.infortion.infordils
		req.get(params)
	}

	// 社区新闻
	CommunityNews(params) {
		params.url = routes.home.infortion.CommunityNews
		req.get(params)
	}

	//新闻详情
	NewsDils(params) {
		params.url = routes.home.infortion.NewsDils
		req.get(params)
	}

	//申请入驻
	moveInApply(params) {
		params.url = routes.home.applecheckin.apple
		req.post(params)
	}

	//申请入驻记录
	applerecord(params) {
		params.url = routes.home.applecheckin.applerecord
		req.get(params)
	}

	//入驻记录详情
	recordDils(params) {
		params.url = routes.home.applecheckin.recordDils
		req.get(params)
	}

		//用户审核入住
		audit(params) {
			params.url = routes.home.applecheckin.audit
			req.patch(params)
		}

	//房东查看入住申请
	userLook(params) {
		params.url = routes.home.applecheckin.userLook
		req.get(params)
	}

	// 出行记录
	travelRecords(params) {
		params.url = routes.home.visitLog.travelRecords
		req.get(params)
	}

	//申请拜访
	VisitApplication(params) {
		params.url = routes.home.visitLog.apply
		req.post(params)
	}

	//最新拜访
	newapply(params) {
		params.url = routes.home.visitLog.newapply
		req.get(params)
	}

	// 拜访记录
	gorecord(params) {
		params.url = routes.home.visitLog.apply
		req.get(params)
	}

	// 拜访记录详情
	goapplydeil(params) {
		params.url = routes.home.visitLog.details
		req.get(params)
	}

	// 来访记录
	Visitrecord(params) {
		params.url = routes.home.Visitrecord.visitors
		req.get(params)
	}

	// 来访详情
	comvisitdeil(params) {
		params.url = routes.home.Visitrecord.details
		req.get(params)
	}

	// 处理来访申请
	handlevisit(params) {
		params.url = routes.home.Visitrecord.handlevisit
		req.patch(params)
	}

	// 获取二维码
	obtaincode(params) {
		params.url = routes.home.qrcode.obtaincode
		req.post(params)
	}

	// 物业查看小区进出记录
	recordOfAccess(params) {
		params.url = routes.propertyManagement.recordOfAccess
		req.get(params)
	}

	//物业入住申请所有记录
	checkinRecord(params) {
		params.url = routes.propertyManagement.checkinRecord
		req.get(params)
	}

	//入住申请记录详情
	checkinDetails(params) {
		params.url = routes.propertyManagement.checkinDetails
		req.get(params)
	}

	// 审核某条记录
	auditRecord(params) {
		params.url = routes.propertyManagement.auditRecord
		req.patch(params)
	}

	//获取所有帖子
	allPost(params) {
		params.url = routes.propertyManagement.allPost
		req.get(params)
	}

	//帖子详情
	postDetails(params) {
		params.url = routes.propertyManagement.postDetails
		req.get(params)
	}

	// 审核帖子
	ReviewPosts(params) {
		params.url = routes.propertyManagement.ReviewPosts
		req.patch(params)
	}

	// 小区内的住户
	allResident(params) {
		params.url = routes.propertyManagement.allResident
		req.get(params)
	}

	//查看申请记录的进度
	applicationProgress(params) {
		params.url = routes.propertyManagement.applicationProgress
		req.get(params)
	}

	//申请成为
	applyToBecome(params) {
		params.url = routes.propertyManagement.applicationProgress
		req.post(params)
	}

	//查看自己的信息
	lookMymsg(params) {
		params.url = routes.propertyManagement.lookMymsg
		req.get(params)
	}

	// 通行二维码
	passQr(params) {
		params.url = routes.propertyManagement.passQr
		req.get(params)
	}

	//发布出租房消息
	releaseRent(params) {
		params.url = routes.home.classifyPost.releaseRent;
		req.post(params);
	}

	// 发布出售房屋信息
	releaseSellers(params) {
		params.url = routes.home.classifyPost.releaseSellers;
		req.post(params);
	}

	// 自己发布的所有出租房信息
	postrentMsg(params) {
		params.url = routes.home.classifyPost.postrentMsg;
		req.get(params);
	}

	// 查看自己发布的房屋出售记录
	postsellMsg(params) {
		params.url = routes.home.classifyPost.postsellMsg;
		req.get(params);
	}

	// 出租房详情
	rentDils(params) {
		params.url = routes.home.classifyPost.rentDils;
		req.get(params);
	}

	// 房屋出售记录的详情
	saleDils(params) {
		params.url = routes.home.classifyPost.saleDils;
		req.get(params);
	}

	// 设置出租房可见性
	rentShow(params) {
		params.url = routes.home.classifyPost.rentShow;
		req.patch(params);
	}

	//更新租房数据
	updataRoom(params) {
		params.url = routes.home.classifyPost.updataRoom;
		req.patch(params);
	}

	//删除租房数据
	delrenRoom(params) {
		params.url = routes.home.classifyPost.delrenRoom;
		req.delete(params);
	}

	// 出售记录的可见性
	saleShow(params) {
		params.url = routes.home.classifyPost.saleShow;
		req.patch(params);
	}

	//更新卖房数据
	houseSaleUp(params) {
		params.url = routes.home.classifyPost.houseSaleUp;
		req.patch(params);
	}

	//删除卖房
	delSale(params) {
		params.url = routes.home.classifyPost.delSale;
		req.delete(params);
	}

	// 查看所有的出租房信息
	allRoom(params) {
		params.url = routes.home.classifyPost.allRoom;
		req.get(params);
	}

	// 租房信息详情
	roomDateils(params) {
		params.url = routes.home.classifyPost.roomDateils;
		req.get(params);
	}

	// 查看平台所有房屋出售记录
	sellRecords(params) {
		params.url = routes.home.classifyPost.sellRecords;
		req.get(params);
	}

	// 出售房屋的记录详情
	sellDetails(params) {
		params.url = routes.home.classifyPost.sellDetails;
		req.get(params);
	}
}
module.exports = new Home