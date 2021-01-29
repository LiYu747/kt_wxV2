import routes from '../request/routes.js';
import req from '../request/req.js';

class Allvillage{
	// 小区
	allvillage (params){
		params.url = routes.village.vagelist.list;
		req.get(params)
	}
	
	//多个小区的联动列表
	selectLists (params){
		params.url = routes.village.vagelist.selectLists;
		req.get(params)
	}
	
	// 小区公告
	Notice (params){
		params.url = routes.village.vagelist.Notice;
		req.get(params)
	}
	
	//公告详情
	Noticeshow (params){
		params.url = routes.village.vagelist.Noticeshow;
		req.get(params)
	}
	
	// 小区展示信息
	displayInformation (params){
		params.url = routes.village.vagelist.displayInformation;
		req.get(params)
	}
	
	// 小区内的帖子
	communityPost (params){
		params.url = routes.village.vagelist.communityPost;
		req.get(params)
	}
	
	// 发布帖子
	releasePost (params){
		params.url = routes.village.vagelist.releasePost;
		req.post(params)
	}
	
	// 帖子详情
	postDetails (params){
		params.url = routes.village.vagelist.postDetails;
		req.get(params)
	}
	
	// 帖子的评论
	postComments (params){
		params.url = routes.village.vagelist.postComments;
		req.get(params)
	}
	
	//删除帖子
	delPost (params) {
		params.url = routes.village.vagelist.delPost
		req.delete(params)
	}
	
	//修改帖子可见性
	visiblePost (params) {
		params.url = routes.village.vagelist.visiblePost
		req.patch(params)
	}
	
	//自己发布的帖子详情
	MypostDeta (params) {
		params.url = routes.village.vagelist.MypostDeta
		req.get(params)
	}
	
	// 发布评论
	relComments (params){
		params.url = routes.village.vagelist.relComments;
		req.post(params)
	}
	
	//自己发的帖子
	SelfComments (params){
		params.url = routes.village.vagelist.SelfComments;
		req.get(params)
	}
	
	 // 自己发布的帖子评论
	 SelfPost (params){
	 	params.url = routes.village.vagelist.SelfPost;
	 	req.get(params)
	 }
	 
	 //默认栏目列表
	 DefaultColumnList (params){
	 	params.url = routes.village.vagelist.DefaultColumnList;
	 	req.get(params)
	 }
	 
	 // 自定义的栏目列表
	 customLists (params) {
		 params.url = routes.village.vagelist.customLists
		 req.get(params)
	 }
}
module.exports = new Allvillage;