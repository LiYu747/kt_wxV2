import routes from '../request/routes.js';
import req from '../request/req.js';

class Sms{
	// 登录验证码
	userLoginCode (params){
		params.url = routes.services.sms.userLoginCode;
		req.post(params);
	}
	// 注册验证码
	userRegCode (params){
		params.url = routes.services.regsms.userRegCode;
		req.post(params);
	}
}

module.exports = new Sms;