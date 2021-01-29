module.exports = {
	get : (a,key,dft)=>{
		
		if(undefined === dft) dft = null;
		
		if( 'object' != typeof a ) return null;
		
		if( undefined === a[key] ) return dft;
		
		return a[key]; 
	}
}