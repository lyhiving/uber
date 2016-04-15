function is_weixin() {
    var ua = navigator.userAgent.toLowerCase();
    if (/(micromessenger)/i.test(ua)) {
	    return true;
	} else {
        return false;
    }
}


function smart_client(){
	var ua = navigator.userAgent.toLowerCase();
	if(/(iPhone|iPad|iPod|iOS)/i.test(ua)) {
	    return 'ios';
	} else if (/(Android)/i.test(ua)) {
	    return 'android';
	}
	return 'web';
}


function loadHtml(){
	var div = document.createElement('div');
	div.id = 'wechat_tips';
	div.innerHTML = '<p><img src="/images/img/wechat_tips.png" alt="用浏览器打开"/></p>';
	document.body.appendChild(div);
}

function loadStyleText(cssText) {
    var style = document.createElement('style');
    style.rel = 'stylesheet';
    style.type = 'text/css';
    try {
        style.appendChild(document.createTextNode(cssText));
    } catch (e) {
        style.styleSheet.cssText = cssText; //ie9以下
    }
    var head=document.getElementsByTagName("head")[0]; //head标签之间加上style样式
    head.appendChild(style); 
}

function complex_wechat(){
	var winHeight = typeof window.innerHeight != 'undefined' ? window.innerHeight : document.documentElement.clientHeight;
	var cssText = "#wechat_tips{position: fixed; left:0; top:0; background: rgba(0,0,0,0.8); filter:alpha(opacity=80); width: 100%; height:100%; z-index: 100;} #weixin-tip p{text-align: center; margin-top: 10%; padding:0 5%;}";
	if(is_weixin()){
		loadHtml();
		loadStyleText(cssText);
		wx_div=document.getElementById("wechat_tips");
		wx_div.onclick=function(){wx_div.style.display="none";};
	}
}

function complex_downloadlink(){
	var _clinet = smart_client();
	var domain = "uber.duapp.com";
	var currentPlistVersion = "download/uber.plist";
	var url = _clinet=='ios'?"itms-services:///?action=download-manifest&url=https%3A%2F%2F" + domain + "%2F" + currentPlistVersion:"https://"+domain+"/download/uberpartner.apk";
	window.onload = function() {
	    try {
	    	if(_clinet=='ios'){
			    var version = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/);
		        var majorVersion = parseInt(version[1], 10);
		        if (majorVersion >= 9) {
			        var urlHref = document.getElementById("uber_app_url");
			        urlHref.href = url;
			        var fontSize = parseInt(urlHref.style.fontSize);
					var documentWidth = document.body.clientWidth;
					while (urlHref.getBoundingClientRect().width >= documentWidth) {
		    	      fontSize--;
			          urlHref.style.fontSize = fontSize;
			        }
			    }
	     	    else {
		            window.location = url;
		        }
	        }else{
		        window.location = url;
	        }
	    } catch (err) {
	        document.getElementById("uber_app_url").style.display = "none";
	        window.location = url;
	    }
	};
}


	