window.onload = function(){
	waterfall('main','pin');

	var dataInt = {'data':[{'src':'1.jpg'},{'src':'2.jpg'},{'src':'3.jpg'},{'src':'4.jpg'}]};
	window.onscroll = function(){
		alert(checkscrollside);
		if(checkscrollside){
			var oparent = document.getElementById('main');
			for(var i = 0;i<dataInt.data.length;i++){
			 	var oPin = document.createElement('div');
	        	oPin.className = 'pin';
		        
		        var oBox = document.createElement('div');
		        oBox.className = 'box';
		        var oImg = document.createElement('img');
		        oImg.src = './images/'+dataInt.data[i].src;
		        oBox.appendChild(oImg);
		        oPin.appendChild(oBox);
		        oparent.appendChild(oPin);
				}

		waterfall('main','pin');
       

	}
    

}
	
}


function waterfall(oParent,pin){
    var oparent = document.getElementById(oParent);
    var ochild = getClassName(oParent,pin);
    var oWidth = ochild[0].offsetWidth;
    var num = Math.floor(document.documentElement.clientWidth/oWidth);
    oparent.style.cssText = 'width:'+num*oWidth+'px;margin:0 auto';
    var _arr = [];
    for(var i = 0;i<ochild.length;i++){
    	var oHeight = ochild[i].offsetHeight;
    	if(i < num){
    		_arr[i] = oHeight;
    	}else{
    		var minH = Math.min.apply(null,_arr);
    		var minHIndex = getminHIndex(_arr,minH);
    		ochild[i].style.position = 'absolute';
    		ochild[i].style.top = minH+'px';

    	    ochild[i].style.left = ochild[minHIndex].offsetLeft+'px';	
    	    _arr[minHIndex] += oHeight;
    	    // console.log(_arr);
    	}
    	
     
    }
}

function getminHIndex(arr,height){
	for(var i in arr){
		if(arr[i] == height){
			return i;
		}
	}
}


function getClassName(oparent,name){
	var oparent = document.getElementById(oparent);
     
	var total = oparent.getElementsByTagName('*');

	var _arr = [];
	for(var i = 0;i < total.length;i++){
		if(total[i].className == name){
			_arr.push(total[i]);
		}
		
	}

	return _arr;
}

function checkscrollside(){
	var oparent = document.getElementById('main');
	var ochild = getClassName('main','pin');
	
	var LastHeight = ochild[ochild.length-1].offsetTop+Math.floor(ochild[ochild.length-1]/2);
	var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
	var bodyHeight = document.documentElement.clientHeight;
	var total = bodyHeight+scrollTop;
	return total > LastHeight ? true :false;
}
checkscrollside();