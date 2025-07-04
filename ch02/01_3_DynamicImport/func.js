const { odd, even } = require('./ment') //require 함수안에 불러올 모듈의 경로
// ment.js에서 odd, even을 불러옴

//짝홀수 판별 함수
function checkOddOrEven(num) {
   if (num % 2 === 0) {
      return even //짝수일 때
   } else {
      return odd //홀수일 때
   }
}

module.exports = checkOddOrEven //checkOddOrEven 함수를 외부로 내보냄
// 다른 파일에서 이 함수를 사용할 수 있도록 module.exports에 할당
// 이 파일을 require로 불러올 때 checkOddOrEven 함수를 사용할 수 있게
