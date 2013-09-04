/**
 *	AJAX with Vanila JS
 *	might be more efficient to use jQuery (subjective)
 *	but I like the learning experience
 **/
function theAjax(action,url,type,mime) {
	var hReq;
	//	set up the http request
	if (window.XMLHttpRequest) {
		hReq = new XMLHttpRequest();
	} else if (window.ActiveXObject) {
		try {
			hReq = new ActiveXObject('Msxml2.XMLHTTP');
		} catch (e) {
			try {
				hReq = new ActiveXObject('Microsoft.XMLHTTP');
			} catch (e) {
				console.log(e);
			}
		}
	}
	//	If there is a problem with XMLHttpRequest
	if (!hReq) {
		console.log('XMLHttpRequest error. Request stopped.');
		return false;
	}
	hReq.onreadystatechange = function() {
		//	Request finished & response ready
		if (hReq.readyState === 4) {
			//	Status is OK
			if (hReq.status === 200) {
				if (hReq.responseText) {
					wooh();	
				} else {
					womp();
				}
			} else {
				console.log('We have run into a problem with your request.', 'Status: ' + hReq.status);
				womp();
			}
		}
	}
	hReq.open(action,url,true);
	if (type) {
		hReq.setRequestHeader(type,mime);
	}
	hReq.send();
}
function wooh() {
	console.log('Sucess!');
}
function womp() {
	console.log('Womp womp!');
}
$('button[name="ajax-button"]').on('click', function() {
	theAjax('GET','nutrition.xml');
});
