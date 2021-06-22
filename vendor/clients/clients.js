import cache from '../cache/cache.js';
import routes from '../request/routes.js';
import utils from '../common/utils.js';
import str from '../common/str.js';

class Clients {

	//此客户端唯一标识
	clientId = '';
	secret = '';

	clientType = 0;

	clientInfo = null;

	cacheKey = 'clientInfo';

	version = '';

	//与后端的客户端类型对应
	CLIENT_TYPE_UNKNOWN = 0;
	CLIENT_TYPE_ANDROID = 1;
	CLIENT_TYPE_IOS = 2;
	CLIENT_TYPE_H5 = 3;

	constructor() {

		//#ifdef APP-PLUS.
		// this.version = plus.runtime.version
		// console.log('version',this.version);
		//#endif 

		this.fixCurrClientType();

		this.createOrUpdate();

		//是否需要更新客户端
		//#ifdef APP-PLUS 
		// this.askUpdateClient();
		//#endif 

	}


	//判断当前的客户端类型
	fixCurrClientType() {
		let t = wx.getSystemInfoSync().platform;

		switch (t) {
			case 'android':
				this.clientType = this.CLIENT_TYPE_ANDROID;
				break;
			case 'ios':
				this.clientType = this.CLIENT_TYPE_IOS;
				break;
			case 'other':
				this.clientType = this.CLIENT_TYPE_UNKNOWN;
				break;
			default:
				this.clientType = this.CLIENT_TYPE_UNKNOWN;
				break;
		}
	}

	loadFromCache() {
		let info = cache.get(this.cacheKey);

		if (!info) return null;

		this.clientInfo = info;
		this.clientId = info.client_id;
		this.secret = info.secret;

		return this.clientInfo;
		// this.clientId = 
	}

	createOrUpdate() {
		let info = this.loadFromCache();
		if (this.clientInfo) this.update();
		else this.create();
	}

	create() {
		let that = this;
		wx.request({
			url: routes.client.reg,
			method: 'POST',
			header: {
				'client-type': that.clientType,
				'client-version': that.version,
			},
			data: {
				type:wx.getSystemInfoSync().system,
				info: wx.getSystemInfoSync()
			},
			fail: () => {
				wx.showModal({
					content: '网络异常，请检查网络',
					showCancel: false
				})
			},
			success: (res) => {
				if (res.statusCode != 200) {
					wx.showModal({
						content: '初始化出错，请重启',
						showCancel: false
					});
					return;
				}

				if (res.data.code != 200) {
					wx.showModal({
						content: '初始化出错,errMsg:' + res.data.msg,
						showCancel: false
					});
					return;
				}

				let data = res.data.data;
				that.clientInfo = data;
				that.clientId = data.client_id;
				that.secret = data.secret;
				cache.set(that.cacheKey, data);
			}
		})
	}

	update() {
   return;
		let that = this;
		wx.request({
			url: routes.client.reg,
			method: 'POST',
			header: {
				'client-type': that.clientType,
				'client-version': that.version,
				'client-id': that.clientId,
				'client-secret': that.secret,
			},
			data: {
				_method: 'patch',
				sys_info: wx.getSystemInfoSync()
			},
			fail: () => {
				wx.showModal({
					content: '网络异常，请检查网络',
					showCancel: false
				})
			},
			success: (res) => {
				if (res.statusCode != 200) {

					return;
				}

				if (res.data.code != 200) {

					return;
				}

				// let data = res.data.data;
				// that.clientInfo = data;
				// that.clientId = data.client_id;
				// that.secret = data.secret;
				// cache.set(that.cacheKey,data);
			}
		})
	}

	getClientId() {
		return this.clientId;
	}

	getClientType() {
		return this.clientType;
	}

	//从服务端获取最新的版本信息
	getLatestVersion(params) {
		params.url = routes.client.version.latest;

		if (params.header === undefined) params.header = {};

		params.header['client-id'] = this.getClientId();
		params.header['client-version'] = this.version;
		params.header['client-type'] = this.getClientType();

		wx.request(params);
	}

	askUpdateClient() {

		let _this = this;

		this.getLatestVersion({
			success: (res) => {
				// console.log('ios', res);
				switch (wx.getSystemInfoSync().platform) {
					case 'android':
						_this.updateAndr(res.data);
						break;
					case 'ios':
						_this.updateIos(res.data);
						break;
				}
			}
		})
	}





	updateAndr(data) {
		let androidVersion = data.data.app_android_latest_version;
		let androiddata = data.data
		if (androidVersion) {
			let d = str.diffVersion(this.version, androidVersion);

			if (d == -1) {
				wx.showModal({
					content: '有版本更新',
					confirmText: '更新',
					success(res2) {
						if (res2.confirm != true) return;
						if (androiddata.app_android_download_apk) {
							wx.showLoading({
								title: '正在下载'
							})
							wx.downloadFile({ //执行下载
								url: androiddata.app_android_download_apk, //下载地址
								success: downloadResult => { //下载成功
									wx.hideLoading();
									if (downloadResult.statusCode != 200) return;
									wx.showModal({
										title: '',
										content: '立即安装',
										confirmText: '安装',
										confirmColor: '#EE8F57',
										success: function(res) {
											if (res.confirm != true) return;
											plus.runtime.install( //安装
												downloadResult.tempFilePath, {
													force: true
												},
												function(res) {
													utils.showToast('更新成功');
													plus.runtime.restart();
												}
											);

										}
									});
								}
							});
							return;
						} else if (androiddata.app_android_download_url) {
							wx.navigateTo({
								url: `/pages/update/update?url=${androiddata.app_android_download_url}`
							})
						}


					}
				})
			}
		}
	}

	updateIos(data) {
		let IosVersion = data.data.app_ios_latest_version;
		let Iosdata = data.data
		if (IosVersion) {
			let d = str.diffVersion(this.version, IosVersion);

			if (d == -1) {
				wx.showModal({
					content: '有版本更新',
					confirmText: '更新',
					success(res2) {
						if (res2.confirm == true) {
							if (Iosdata.app_android_download_url) {
								wx.navigateTo({
									url: `/pages/update/update?url=${Iosdata.app_android_download_url}`
								})
							}
						}
					}
				})
			}
		}
	}
}

module.exports = new Clients;
