class Str{
	
	diffVersion(v1,v2){
		let v11 = v1.split('.',3);
		let v22 = v2.split('.',3);
		
		for(let index in v11){
			let d = this.diffNum(parseInt(v11[index]),parseInt(v22[index]));
			if( d != 0 ) return d;
		}
		
		return 0;
	}
	
	diffNum( n1,n2 ){
		if( n1 > n2  ) return 1;
		else if(n1 == n2 ) return 0;
		else return -1;
	}
}

module.exports = new Str;