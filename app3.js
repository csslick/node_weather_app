/* 
	- 사용자 요청에 따른 기능 추가
	- 콘솔 앱 실행시 파라미터 전달 받기
*/
const request = require('request');

// 앱 실행시 옵션으로 입력되는 매개변수(인자값)를 처리하는 모듈
const yargs = require('yargs');	
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

// console.log(argv);	


//	URL 전달 방식으로 인코딩(name%name%...)
//	CLI 옵션으로 입력받은 address값을 URL 방식(%)으로 변경하여야 한다.
var encodedAddress = encodeURIComponent(argv.address);
console.log(encodedAddress);


// 구글맵 API URL
request({
	// 인코딩된 주소(encodedAddress를 파라미터로 추가 ``
	url: `http://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
	json: true	// JSON 객체로 반환
}, function(err, res, body){
	// console.log(JSON.stringify(body, undefined, 2));

	console.log(`Address: ${body.results[0].formatted_address}`);
	console.log(`Latitude: ${body.results[0].geometry.location.lat}`);
	console.log(`Lonitude: ${body.results[0].geometry.location.lng}`);
});

