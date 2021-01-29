import req from '../request/req.js';
import route from '../request/routes.js';

class Config{
	
	task = [];
	
	data = null;
	
	constructor() {
	    this.loadConfigFromServer();
	}
	
	ready(callback){
		if( !callback || 'function' !== typeof callback)  return;
		
		if( this.data === null ){
			this.task.push(callback);
		}else{
			callback(this.data);
		}
	}
	//从服务器端获取配置
	loadConfigFromServer(){
		let that = this;
		req.get({
			url : route.client.config,
			fail : ()=>{
				wx.showModal({
					title : '加载配置出错',
					content : '重新加载',
					showCancel : false,
					success : ()=>{
						that.loadConfigFromServer();
					},
					fail : ()=>{
						that.loadConfigFromServer();
					}
				
				})
			},
			success : (res)=>{
				if( res.statusCode !== 200 ){
					wx.showModal({
						title : '加载配置出错',
						content : '重新加载',
						showCancel : false,
						success : ()=>{
							that.loadConfigFromServer();
						},
						fail : ()=>{
							that.loadConfigFromServer();
						}
					
					})
					return;
				}
				
				if( res.data.code !== 200 ){
					wx.showModal({
						title : '加载配置出错',
						content : res.data.msg,
						showCancel : false,
						success : ()=>{
							that.loadConfigFromServer();
						},
						fail : ()=>{
							that.loadConfigFromServer();
						}
					
					})
					return;
				}
				
				that.data = res.data.data;
				// console.log('data:',that.data);
				that.execTask();
			}
		})
	}

	execTask(){
		while(true){
			if( this.task.length == 0 ) break;
			let func = this.task.shift();
			if( 'function' !== typeof func ) break;
			
			func(this.data);
		}
	}
	
	
}      

module.exports = new Config;