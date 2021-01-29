import routes from '../request/routes.js';
import req from '../request/req.js';

class userd{
	// 个人信息
	userDeta(params){
		params.url = routes.user.userdeta.userdetails;
		req.get(params)
	}

	//修改个人信息
	userupdate(params){
		params.url = routes.user.userupdate.update
		req.patch(params)
	}
	
	////修改证件照
	updataphoto(params){
		params.url = routes.user.userupdate.updataphoto
		req.patch(params)
	}
	
	// 更新实名认证信息
	updataRealname(params){
		params.url = routes.user.userupdate.updataRealname
		req.patch(params)
	}
	
	// 设置密码的验证码
	stePawcode(params){
		params.url = routes.user.userupdate.stePawcode
		req.post(params)
	}
	
	//设置新密码
	steNewpaw(params){
		params.url = routes.user.userupdate.steNewpaw
		req.patch(params)
	}
	
	//获取地图导航key
	Navigation(params){
		params.url = routes.Navigation.Navmap;
		req.get(params)
	}
}
module.exports = new userd;