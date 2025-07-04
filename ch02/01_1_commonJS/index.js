//1.묘듈의 사용법
// const checkNumber = require('./func') //func.js에서 checkNumber 함수를 불러옴

// console.log('checkNumber', checkNumber(10)) //짝수입니다.
// console.log('checkNumber', checkNumber(9)) //홀수입니다.

//2. require는 함수고, 함수는 객체이므로 require는 객체로서 속성을 가지고 있다.
// console.log(require.main) //require.main은 현재 실행 중인 모듈을 나타냄

//require는 가장 위에 오지 않아도 된다.
require('./ment')


//3.순환참조 문제
const insideDep1 = require('./dep1') //dep1.js에서 insideDep1 함수를 불러옴
const insideDep2 = require('./dep2') //dep2.js에서 insideDep2 함수를 불러옴
insideDep1() //dep2:  { insideDep2: [Function: insideDep2] }
insideDep2() //dep1:  { insideDep1: [Function: insideDep1] }
// 순환참조가 발생하여 dep1과 dep2가 서로를 참조함
//하지만 순환참조를 한다면 한쪽의 객체는 가져오지 못합니다.
// 왜냐하면 require는 모듈을 불러올 때 해당 모듈이 완전히 로드되기 전에 참조하기 때문입니다.
// 따라서 dep1.js에서 dep2를 불러오고, dep2.js에서 dep1을 불러오면
// dep1.js는 dep2.js가 완전히 로드되기 전에 dep2를 참조하게 되고,
// dep2.js는 dep1.js가 완전히 로드되기 전에 dep1을 참조하게 됩니다. 
