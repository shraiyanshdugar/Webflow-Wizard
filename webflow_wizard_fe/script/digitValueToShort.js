
//Specifically for set free then buy pets

function calculateNewValue(value) {
	if(value > (10**84)){
		ans = String((value/(10**89)).toFixed(2)) + ' ' +  'Nv';
		return ans;
    }
	else if(value > (10**78)){
		ans = String((value/(10**83)).toFixed(2)) + ' ' +  'Sv';
		return ans;
    }
	else if(value > (10**72)){
		ans = String((value/(10**77)).toFixed(2)) + ' ' +  'Qv';
		return ans;
    }
	else if(value > (10**66)){
		ans = String((value/(10**71)).toFixed(2)) + ' ' +  'Tv';
		return ans;
    }
	else if(value > (10**60)){
		ans = String((value/(10**65)).toFixed(2)) + ' ' +  'Uv';
		return ans;
    }
    else if(value > (10**54)){
		ans = String((value/(10**59)).toFixed(2)) + ' ' +  'Nd';
		return ans;
    }
	else if(value > (10**48)){
		ans = String((value/(10**53)).toFixed(2)) + ' ' +  'Sd';
		return ans;
    }
	else if(value > (10**42)){
		ans = String((value/(10**47)).toFixed(2)) + ' ' +  'Qd';
		return ans;
    }
	else if(value > (10**36)){
		ans = String((value/(10**41)).toFixed(2)) + ' ' +  'Td';
		return ans;
    }
	else if(value > (10**30)){
		ans = String((value/(10**35)).toFixed(2)) + ' ' +  'U';
		return ans;
    }
	else if(value > (10**24)){
		ans = String((value/(10**24)).toFixed(2)) + ' ' +  'N';
		return ans;
    }
	else if(value > (10**18)){
		ans = String((value/(10**23)).toFixed(2)) + ' ' +  'S';
		return ans;
    }
	else if(value > (10**12)){
		ans = String((value/(10**17)).toFixed(2)) + ' ' +  'Q';
		return ans;
    }
	else if(value > (10**6)){
		ans = String((value/(10**11)).toFixed(2)) + ' ' +  'T';
		return ans;
    }
	else{
		ans = String(value/(10**5));
		return ans;
    }
}

module.exports = {calculateNewValue};