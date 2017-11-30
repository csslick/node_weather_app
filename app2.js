const request = require('request');

// 구글맵 API URL
request({
	url: 'http://maps.googleapis.com/maps/api/geocode/json?address=seoul%20korea%20ssangmun',
	json: true
}, function(err, res, body){
	// console.log(JSON.stringify(body, undefined, 2));

	// 음답 결과를 확인(http를 통해 body에 보내옴)
	// status code가 200이면 응답 성공, 아니며 error를 콜백함
	console.log(JSON.stringify(res, undefined, 2));

	console.log(`Address: ${body.results[0].formatted_address}`);
	console.log(`Latitude: ${body.results[0].geometry.location.lat}`);
	console.log(`Lonitude: ${body.results[0].geometry.location.lng}`);
});

