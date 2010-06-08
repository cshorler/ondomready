/*
 * onDOMReady
 * Copyright (c) 2009 Ryan Morr (ryanmorr.com)
 * Licensed under the MIT license.
 */

onDOMReady = (function(){
	var ready, timer, setup = false, stack = [];
	var onStateChange = function(e){
		//Mozilla & Opera
		if(e && e.type == "DOMContentLoaded"){
			fireDOMReady();
		//Legacy	
		}else if(e && e.type == "load"){
			fireDOMReady();
		//Safari & IE
		}else if(document.readyState){
			if((/loaded|complete/).test(document.readyState)){
				fireDOMReady();
			//IE, courtesy of Diego Perini (http://javascript.nwbox.com/IEContentLoaded/)
			}else if(!!document.documentElement.doScroll){
				try{
					ready || document.documentElement.doScroll('left');
				}catch(e){
					return;
				}
				fireDOMReady();
			}
		}
	};
	
	var fireDOMReady = function(){
		if(!ready){
			ready = true;
			//Call the stack of onload functions in given context or window object
			for(var i=0, len=stack.length; i < len; i++){
				stack[i][0].call(stack[i][1] || window);	
			}
			//Clean up after the DOM is ready
			if(document.removeEventListener)
				document.removeEventListener("DOMContentLoaded", onStateChange, false);
			document.onreadystatechange = null;
			window.onload = null;
			clearInterval(timer);
			timer = null;
		}
	};
	
	return function(fn, ctx){
		if(!setup){
			//We only need to do this once
			setup = true;
			//Mozilla & Opera
			if(document.addEventListener)
				document.addEventListener("DOMContentLoaded", onStateChange, false);
			//IE
			document.onreadystatechange = onStateChange;
			//Safari & IE
			timer = setInterval(onStateChange, 5);
			//Legacy
			window.onload = onStateChange;
		}
		stack.push([fn, ctx]);
	}
})();