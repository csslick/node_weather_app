const request = require('request');

var getWeather = function(lat, lng, callback){

	// Darksky 기상 데이터 api 요청 
	request({
		url: `https://api.darksky.net/forecast/ce0b572bee660ab58fa8396665d3d088/${lat},${lng}`,
		json: true
	}, function(err, res, body){
		if(err) {
			// 서버 접속 에러
			callback('기상데이터 서버에 접속할 수 없습니다.', null);
		} else if(res.statusCode === 400){
			// url 에러
			callback(res.statusCode + '-' + body.error, null);	
		} else {
			// if(res.statusCode == 200)
			// (화씨온도 - 32) ÷ 1.8 = 섭씨온도
			var currentTemp = (body.currently.temperature - 32) / 1.8;
			var apparentTemp = (body.currently.apparentTemperature - 32) / 1.8;
			callback(null, {
				currentTemp: currentTemp,
				apparentTemp: apparentTemp
			});
		}
		
	});
};

module.exports.getWeather = getWeather;