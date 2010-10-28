/*
 * onDOMReady
 * Copyright (c) 2010 Ryan Morr (ryanmorr.com)
 * Licensed under the MIT license.
 */

(function(win){
	//Define common variables
	var timer, doc = win.document, ready = false, setup = false, stack = [];
		
	//Responsible for handling events and each tick of the interval
	function onStateChange(e){
		//IE compatibility
		e = e || win.event;
		//Mozilla, Opera, & Legacy
		if(e && e.type && (/DOMContentLoaded|load/).test(e.type)){
			fireDOMReady();
		//Legacy	
		}else if(doc.readyState){
			if((/loaded|complete/).test(doc.readyState)){
				fireDOMReady();
			//IE, courtesy of Diego Perini (http://javascript.nwbox.com/IEContentLoaded/)
			}else if(doc.documentElement.doScroll){
				try{
					ready || doc.documentElement.doScroll('left');
				}catch(e){
					return;
				}
				//If no error was thrown, the DOM must be ready
				fireDOMReady();
			}
		}
	};
	
	//Fires all the functions and cleans up memory
	function fireDOMReady(){
		if(!ready){
			ready = true;
			//Call the stack of onload functions in given context or window object
			for(var i=0, len=stack.length; i < len; i++){
				stack[i][0].call(stack[i][1] || window);	
			}
			//Clean up after the DOM is ready
			if(doc.removeEventListener)
				doc.removeEventListener("DOMContentLoaded", onStateChange, false);
			//Clear the interval	
			clearInterval(timer);
			//Null the timer and event handlers to release memory
			doc.onreadystatechange = win.onload = timer = null;
		}
	};
	
	//Primary method
	win.onDOMReady = function(fn, ctx){
		if(ready){
			//If the DOM is ready, call the function and return
			fn.call(ctx || window);
			return;
		}
		if(!setup){
			//We only need to do this once
			setup = true;
			//Mozilla & Opera
			if(doc.addEventListener)
				doc.addEventListener("DOMContentLoaded", onStateChange, false);
			//Safari & IE
			timer = setInterval(onStateChange, 5);
			//IE & Legacy
			doc.onreadystatechange = win.onload = onStateChange
		}
		//Add the function to the stack
		stack.push([fn, ctx]);
	};
})(this);