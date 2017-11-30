const request = require('request');

// 구글맵 API URL
request({
	url: 'http://maps.googleapis.com/maps/api/geocode/json?address=seoul%20korea%20ssangmun',
	json: true
}, function(err, res, body){
	// JSON.stringify(data, [undefined], [tab간격])
	console.log(JSON.stringify(body, undefined, 2));
});