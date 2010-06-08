/*
 * onDOMReady
 * Copyright (c) 2009 Ryan Morr (ryanmorr.com)
 * Licensed under the MIT license.
 */

onDOMReady=(function(){var ready,timer,setup=false,stack=[];var onStateChange=function(e){if(e&&e.type=="DOMContentLoaded"){fireDOMReady()}else if(e&&e.type=="load"){fireDOMReady()}else if(document.readyState){if((/loaded|complete/).test(document.readyState)){fireDOMReady()}else if(!!document.documentElement.doScroll){try{ready||document.documentElement.doScroll('left')}catch(e){return}fireDOMReady()}}};var fireDOMReady=function(){if(!ready){ready=true;for(var i=0,len=stack.length;i<len;i++){stack[i][0].call(stack[i][1]||window)}if(document.removeEventListener)document.removeEventListener("DOMContentLoaded",onStateChange,false);document.onreadystatechange=null;window.onload=null;clearInterval(timer);timer=null}};return function(fn,ctx){if(!setup){setup=true;if(document.addEventListener)document.addEventListener("DOMContentLoaded",onStateChange,false);document.onreadystatechange=onStateChange;timer=setInterval(onStateChange,5);window.onload=onStateChange}stack.push([fn,ctx])}})();