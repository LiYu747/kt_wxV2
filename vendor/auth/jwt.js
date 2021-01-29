import dater from '../date/dater.js';
import cache from '../cache/cache.js';
import base64 from '../base/base64.js';
import arr from '../common/arr.js';
import utils from '../common/utils.js';

class JWT{
	
	token = '';
	tokenExp = 0;
	
	cacheTokenKey = 'jwt';
	
	loginCallbackTask = [];
	
	constructor(){
		this.reload();
	}
	
	flush(params){
		this.token = '';
		this.tokenExp = 0;
		cache.forget(this.cacheTokenKey);
		utils.doIfIsFunc(params.success);
	}
	
	//从本地获取token
	reload(){
		let tokenInfo = cache.getWithExp(this.cacheTokenKey);
		
		if ( tokenInfo == null ) return;
		
		this.token = tokenInfo.value;
		this.tokenExp = tokenInfo.exp;
	}
	
	getToken(){
		
		//避免极限失效时间
		if( this.tokenExp <= (dater.now().getCurrMSeconds() - 10 ) ) return '';
		return this.token;
	}
	
	/**
	 * @param {String} token 字符串
	 * @param {Number} exp 过期时间，单位毫秒
	 */
	setToken(token,exp,callback){
		
		this.token = token;
		this.tokenExp = exp;
		cache.set(this.cacheTokenKey,token,exp);
		
		utils.doIfIsFunc(callback);
	}
	
	parseToken(token){
		
		let jwt_token = token
		let jwtPre = "Bearer ";
		let str = jwt_token.slice(jwtPre.length);
		let jwtArr = str.split('.'); 
		
		let info = jwtArr.length == 3 ? jwtArr[1] : null;
		if(!info ) return null;
		return JSON.parse(base64.decode(info));
	}
	
	/**
	 * 只能在有可用token的
	 */
	getParseInfo(){
		let t = this.getToken();
		if ( !t ) return null;
		return this.parseToken(t);
	}
	
	
	isAskLogin = false;
	
	doOnlyTokenValid(params){
		
		let token = this.getToken();
		
		if( token ){
			utils.doIfIsFunc(params.success);
			return;
		}
		
		//是否需要在登录成功后继续执行success
		let keepSuccess = arr.get(params,'keepSuccess',true);
		
		if( keepSuccess == true ) this.pushTask(params.success);
		
		let showModal = arr.get(params,'showModal',false);
		
		if( showModal === false ) {
			utils.doIfIsFunc(params.fail)
			return;
		}
		
		if( this.isAskLogin == true ) return;
		
		this.isAskLogin = true;
		
		let that = this;
		
		wx.showModal({
			title : arr.get(params,'modalTitle',''),
			content: arr.get(params,'modalContent','请登录以便我们为您提供更准确的服务'),
			showCancel : arr.get(params,'showCancel',true),
			success(res) {
				that.isAskLogin = false;
				if( res.confirm == true){
					
					// let routes = getCurrentPages(); // 获取当前打开过的页面路由数组
					// let curRoute = routes[routes.length - 1].route  //获取当前路由
					wx.navigateTo({
						url : `/pages/loginAndR/login/login`,
					})
					wx.hideLoading()
				}else{
					utils.doIfIsFunc(params.fail)
				}
			}
		})
	}
	
	
	pushTask(callback){
		if( utils.isFunc(callback) ) this.loginCallbackTask.push(callback);
	}
	
	execTask(){
		if( this.loginCallbackTask.length < 1 ) return;
		
		while(true){
			let c = this.loginCallbackTask.shift();
			utils.doIfIsFunc(c);
			if( this.loginCallbackTask.length < 1 ) break;
		}
	}
	
	flushAllTask(){
		this.loginCallbackTask = [];
	}
	
	//判断是否登录再执行
	// doWithAuth(params){
	// 	if( !params ) return;
		
	// 	//token过期
	// 	if( !this.tokenExp || this.tokenExp <= dater.now().getCurrMSeconds()  ){
			
	// 	}
	// }
	
}

module.exports = new JWT;