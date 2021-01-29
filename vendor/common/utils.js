module.exports = {
	isFunc : (e)=>{
		return 'function' == typeof e;
	},
	
	isObj : (e)=>{
		return 'object' == typeof e;
	},
	
	doIfIsFunc(e,...args){
		if( this.isFunc(e) ) e(...args);
	}
}