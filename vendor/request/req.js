/**
 * 对uni.request 进行二次封装
 */
import jwt from '../auth/jwt.js';
import clients from '../clients/clients.js';

class req{
	
	appendHeader(params){
		if( params.header === undefined ) params.header = {};
		
		//固定的几个头部
		params.header['Authorization'] = jwt.getToken();
		params.header['client-id'] = clients.getClientId();
		params.header['client-version'] = clients.version;
		params.header['client-type'] = clients.getClientType();
	}
	
	get(params){
		this.appendHeader(params);
		params.method = 'GET';
		wx.request(params);
	}
	
	post(params){
		this.appendHeader(params);
		params.method = 'POST';
		wx.request(params);
	}
	
	patch(params){
		if( !params.data ) params.data = {};	
		params.data._method = 'PATCH';
		this.post(params);
	}
	
	delete(params){
		this.appendHeader(params);
		params.method = 'DELETE';
		wx.request(params);
	}
}

module.exports = new req;