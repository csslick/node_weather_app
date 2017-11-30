/* 
	Wiring Up Weather Search
*/
const request = require('request');

// 앱 실행시 옵션으로 입력되는 매개변수(인자값)를 처리하는 모듈
const yargs = require('yargs');	

const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

const argv = yargs.options({
	// address 옵션 설정
	a: {
		demand: true,
		alias: 'address',	// 대체 옵션명
		describe: 'Address to fetch weather for',	//  설명
		string: true	// 입력받는 타입
	}
})
	.help()
	.alias('help', 'h')
	.argv;	// 입력 받은 파라미터 정보

// 입력 받은 address 인자를 geocode() 메소드로 처리
// 콜백함수 추가: error 있으면 err, 없으면 result 반환
geocode.geocodeAddress(argv.address, function(err, result) {
	if(err) {
		console.log(err)
	} else {
		console.log(JSON.stringify(result, undefined, 2));
	}

	var address = result.address,
		lat  = result.latitude,
		lng = result.lonitude;

	// lat, lng, callback
	weather.getWeather(lat, lng, (err, weatherResult) => {
		if(err) {
			console.log(err)
		} else {
			console.log(`현재 온도는 ${weatherResult.currentTemp}이며 체감온도는 ${weatherResult.apparentTemp} 입니다.`);
		}
	});
});






// darksky api key: ce0b572bee660ab58fa8396665d3d088
// url: https://api.darksky.net/forecast/[key]/[latitude],[longitude]















