const request = require('request');

// argv.address를 전달 받음
var geocodeAddress = (address, callback) => {

	var encodedAddress = encodeURIComponent(address);

	// 구글맵 API URL
	request({
		url: `http://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
		json: true	// JSON 객체로 반환
	}, function(err, res, body){
		if(err){
			// 에러 콜백 처리
			callback('구글 서버에 연결할 수 없습니다.');

			// Server Error
			console.log('Connect Error');

		} else if(body.status === 'ZERO_RESULTS'){
			// Address Error
			callback('주소가 올바르지 않습니다.');
			console.log('Address Missing');
			console.log(body.status);

		} else if(body.status === 'OK'){
			// 성공시 주소 정보를 객체로 반환
			callback(undefined, {
				address: body.results[0].formatted_address,
				latitude: body.results[0].geometry.location.lat,
				lonitude: body.results[0].geometry.location.lng
			});
		}
	});
};

// geocodeAddres 메소드를 모듈로 정의
module.exports.geocodeAddress = geocodeAddress;



