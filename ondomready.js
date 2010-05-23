/*
 * onDOMReady
 * Copyright (c) 2009 Ryan Morr (ryanmorr.com)
 * Licensed under the MIT license.
 */

function onDOMReady(fn, ctx){
	var ready, timer;
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
			//Call the onload function in given context or window object
			fn.call(ctx || window);
			//Clean up after the DOM is ready
			if(document.removeEventListener)
				document.removeEventListener("DOMContentLoaded", onStateChange, false);
			document.onreadystatechange = null;
			window.onload = null;
			clearInterval(timer);
			timer = null;
		}
	};
	
	//Mozilla & Opera
	if(document.addEventListener)
		document.addEventListener("DOMContentLoaded", onStateChange, false);
	//IE
	document.onreadystatechange = onStateChange;
	//Safari & IE
	timer = setInterval(onStateChange, 5);
	//Legacy
	window.onload = onStateChange;
};