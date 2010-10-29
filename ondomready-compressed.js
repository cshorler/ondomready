/*
 * onDOMReady
 * Copyright (c) 2009 Ryan Morr (ryanmorr.com)
 * Licensed under the MIT license.
 */

(function(win){var timer,doc=win.document,ready=false,setup=false,stack=[];function onStateChange(e){e=e||win.event;if(e&&e.type&&(/DOMContentLoaded|load/).test(e.type)){fireDOMReady()}else if(doc.readyState){if((/loaded|complete/).test(doc.readyState)){fireDOMReady()}else if(doc.documentElement.doScroll){try{ready||doc.documentElement.doScroll('left')}catch(e){return}fireDOMReady()}}};function fireDOMReady(){if(!ready){ready=true;for(var i=0,len=stack.length;i<len;i++){stack[i][0].call(stack[i][1])}if(doc.removeEventListener)doc.removeEventListener("DOMContentLoaded",onStateChange,false);clearInterval(timer);doc.onreadystatechange=win.onload=timer=null}};win.onDOMReady=function(fn,ctx){ctx=ctx||win;if(ready){fn.call(ctx);return}if(!setup){setup=true;if(doc.addEventListener)doc.addEventListener("DOMContentLoaded",onStateChange,false);timer=setInterval(onStateChange,5);doc.onreadystatechange=win.onload=onStateChange}stack.push([fn,ctx])}})(this);