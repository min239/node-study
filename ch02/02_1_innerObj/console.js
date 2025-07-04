const string = 'abc'
const number = 1
const boolean = true
const obj = {
   outside: {
      inside: {
         key: 'value',
      },
   },
}

console.table([
   { name: '제로', birth: 1994 },
   { name: 'hero', birth: 1988 },
])

//객체를 콘솔에 어떻게 표시할지를 설정
console.dir(obj, { colors: true, depth: 1 }) //depth: 첫번쨰 인자에 지정된 객체의 깊이만큼 출력
//depth: 1이면 obj의 첫번째 속성인 outside까지만 출력
console.dir(obj, { colors: true, depth: 2 })

//코드의 실행시간 측정
console.time('실행 시간측정') //time()과 timeEnd() 사이의 시간을 측정
//time()의 인자와 timeEnd()의 인자는 같아야 함
for (let i = 0; i < 100000; i++) {}
console.timeEnd('실행 시간측정')

//에러위치 추적
function b() {
    console.trace('에러위치 추적') //trace()는 현재 실행중인 함수의 호출 스택을 추적, 에러가 발생한 위치를 추적하는 데 유용
}

function a() {
    b()
}

a()