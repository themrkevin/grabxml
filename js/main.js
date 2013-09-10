/**
 *	AJAX with Vanila JS
 *	might be more efficient to use jQuery (subjective)
 *	but I like the learning experience
 **/
function theAjax(action,url,type,mime) {
	var hReq,
		output;
	//	set up the http request
	if(window.XMLHttpRequest) {
		hReq = new XMLHttpRequest();
	} else if(window.ActiveXObject) {
		try {
			hReq = new ActiveXObject('Msxml2.XMLHTTP');
		} catch(e) {
			try {
				hReq = new ActiveXObject('Microsoft.XMLHTTP');
			} catch(e) {
				console.log(e);
			}
		}
	}
	//	If there is a problem with XMLHttpRequest
	if(!hReq) {
		console.log('XMLHttpRequest error. Request stopped.');
		return false;
	}
	hReq.onreadystatechange = function() {
		//	Request finished & response ready
		if(hReq.readyState === 4) {
			//	Status is OK
			if(hReq.status === 200) {
				if(hReq.responseXML) {
					console.log('Sucess!', hReq);
					//	create the container
					output = '<h1>Nutrition List</h1><ul class="nutrition-list" data-target="nutrition-list">';
					//	generate the content
					data = hReq.responseXML.getElementsByTagName('nutrition');
					// console.log('data:', data);
					for(i=0;i<data.length;i++) {
						dailyVal = data[i].getElementsByTagName('daily-values');
						// console.log('daily-values:', dailyVal);
						// output = output+'<li>'+dailyVal[0].childNodes+'</li>';
						food = data[i].getElementsByTagName('food');
						console.log(food);
						for(i=0;i<food.length;i++) {
							foodName = food[i].getElementsByTagName('name');
							foodName.val = foodName[0].childNodes[0].nodeValue;
							serving = food[i].getElementsByTagName('serving');
							serving.val = serving[0].childNodes[0].nodeValue;
							serving.unit = serving[0].attributes[0].nodeValue;
							calories = food[i].getElementsByTagName('calories');
							calories.total = calories[0].attributes[0].nodeValue;
							calories.fat = calories[0].attributes[1].nodeValue;
							//	this is where templates would come in handy, but thats not what this exercise is for
							output = output+
								'<li>'+
									'<h2>'+foodName.val+'</h2>'+
									'<ul>'+
										'<li><strong>Serving Size:</strong> '+serving.val+serving.unit+'</li>'+
										'<li><strong>Calories per serving:</strong> '+calories.total+'</li>'+
										'<li><strong>Calories from Fat:</strong> '+calories.fat+'</li>'+
									'</ul>'+
								'</li>';
						}
					}
					//	close the container
					output = output+'</ul>';
					console.log(output);
					//	generate the container for the xml stuff
					var container = document.createElement('div'),
						mid = document.getElementById('mid'),
						nutCont;
					container.id = 'nutrition-list-container';
					mid.appendChild(container);
					//	spitting our data into the DOM
					nutCont = document.getElementById('nutrition-list-container');
					nutCont.innerHTML = output;

				} else {
					console.log('Womp womp!');
				}
			} else {
				console.log('We have run into a problem with your request.', 'Status: ' + hReq.status);
			}
		}
	}
	hReq.open(action,url,true);
	if(type) {
		hReq.setRequestHeader(type,mime);
	}
	hReq.send();
}
var ajaxButton = document.querySelector('button[name="ajax-button"]');
if(ajaxButton.addEventListener) {
	ajaxButton.addEventListener('click', function() {
		theAjax('GET','nutrition.xml');
	});
} else {
	ajaxButton.attachEvent('click', function() {
		theAjax('GET','nutrition.xml');
	});
} 