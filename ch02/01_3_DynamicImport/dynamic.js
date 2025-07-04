const a = true

//dinamic import:특정 조건일때 require
//commonjs 모듈일떄 문제 없이 사용가능

if (a) {
    require('./func') // 동적으로 func.js 모듈을 불러옴
}

console.log('성공')
// 동적 import를 사용하여 조건에 따라 모듈을 불러오는 예시
// 위의 코드에서는 a가 true일 때만 func.js 모듈을 불러옴
// 이 방식은 모듈을 필요할 때만 불러오므로 초기 로딩 시간을 줄일 수 있음
// 또한, 동적 import는 코드의 가독성을 높이고 유지보수를 용이하게 함
// 이 예시에서는 a가 true일 때만 func.js 모듈을 불러오므로,
// func.js에서 정의된 checkOddOrEven 함수를 사용할 수 있게 됨   

