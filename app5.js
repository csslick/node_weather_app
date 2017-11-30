/* 
	Abstracting Callbacks(콜백 추상화)
*/
const request = require('request');

// 앱 실행시 옵션으로 입력되는 매개변수(인자값)를 처리하는 모듈
const yargs = require('yargs');	

const geocode = require('./geocode/geocode');

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
});





/** 아하의 코드는 geocode 모듈로 빼냄 */
// var encodedAddress = encodeURIComponent(argv.address);


// // 구글맵 API URL
// request({
// 	url: `http://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
// 	json: true	// JSON 객체로 반환
// }, function(err, res, body){
// 	if(err){
// 		// Server Error
// 		console.log('Connect Error');
// 	} else if(body.status === 'ZERO_RESULTS'){
// 		// Address Error
// 		console.log('Address Missing');
// 		console.log(body.status);
// 	} else if(body.status === 'OK'){
// 		console.log(`Address: ${body.results[0].formatted_address}`);
// 		console.log(`Latitude: ${body.results[0].geometry.location.lat}`);
// 		console.log(`Lonitude: ${body.results[0].geometry.location.lng}`);
// 	}
// });

