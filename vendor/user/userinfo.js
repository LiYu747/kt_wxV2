import routes from '../request/routes.js';
import req from '../request/req.js';

class Register{
	// 注册
	register(params){
		params.url = routes.user.register.regis;
		req.post(params)
	}
	// 登录
	//需登录成功后再执行的所有回调
	loginSuccessCallbackTask = [];
	
	Signin(params){
		params.url = routes.user.auth.login;
		req.post(params);
	}
	
}
module.exports = new Register;