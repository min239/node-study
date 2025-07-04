const dep2 = require('./dep2')
// dep2.js에서 dep2를 불러옴
// require 함수는 CommonJS 모듈 시스템에서 다른 모듈을 불러오는 함수입니다.
console.log('require dep1: ', dep2)

function insideDep1() {
   console.log('dep2: ', dep2)
}

module.exports = insideDep1
