let d=null;

class dater{
	
	now(){
		d = new Date;
		return new dater;
	}
	
	/**
	 * @return {int} 当前的毫秒数
	 */
	getCurrMSeconds(){
		return d.getTime();
	}
	
	
}

module.exports = new dater;