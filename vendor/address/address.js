import routes from '../request/routes.js';
import req from '../request/req.js';
class Address {
	// 用户所有地址
	alladd (params) {
		params.url = routes.address.alladd.list;
		req.get(params);
	}
	
	 // 某一个住址的详细信息
	 listdetails ( params) {
		 params.url = routes.address.alladd.listdetails
		 req.get(params)
	 }
	
	//预约电梯
	bookingElevator (params) {
		params.url = routes.address.bookingElevator.booking
		req.get(params)
	}
	
	//查看住所内的所有成员
	lookMember ( params) {
			 params.url = routes.address.alladd.lookMember
			 req.get(params)
	}
	
	// 查找用户是否存在
	findUser ( params) {
			 params.url = routes.address.alladd.findUser
			 req.get(params)
	}
	
	//添加住所成员
	pushMember ( params) {
			 params.url = routes.address.alladd.pushMember
			 req.post(params)
	}
	
	//成员的详情
	memberDetails ( params) {
			 params.url = routes.address.alladd.memberDetails
			 req.get(params)
	}
	
	// 更新成员信息权限
	updateMember ( params) {
			 params.url = routes.address.alladd.updateMember
			 req.patch(params)
	}
	
	// 移除某个成员
	deleteMember ( params) {
			 params.url = routes.address.alladd.deleteMember
			 req.delete(params)
	}

	//物业留言反馈
	feedback ( params) {
		params.url = routes.address.alladd.feedback
		req.post(params)
}
}
module.exports = new Address