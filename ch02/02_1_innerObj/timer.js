// const timeout = setTimeout(() => {
//   console.log('1.5초 후 실행');
// }, 1500)

// const interval = setInterval(() => {
//   console.log('1초마다 실행');
// }, 1000)

// setTimeout(() => {
//     clearTimeout(timeout) //clearTimeout()은 setTimeout()으로 설정한 타이머를 취소, 7초뒤 settimeout을 중지
//     clearInterval(interval) //clearInterval()은 setInterval()로 설정한 타이머를 취소, 7초뒤 setInterval을 중지
// },7000)

setTimeout(() => {
   console.log('setImmediate') 
}, 0) // setTimeout()은 지정된 시간 후에 함수를 실행, 0초 후에 실행되지만 이벤트 루프의 다음 사이클에서 실행됨

//setTimeout()과 setImmediate()의 차이점은 setTimeout()은 지정된 시간 후에 함수를 실행하는 반면, setImmediate()는 현재 이벤트 루프 사이클이 끝난 후 즉시 함수를 실행한다는 점입니다.
//setTimeout(함수, 0)보다 setImmediate이 먼저 실행되기는 하지만
const immediate = setImmediate(() => {
   console.log('즉시 실행')
})


const immediate2 = setImmediate(() => {
   console.log('실행되지 않습니다.')
})

clearImmediate(immediate2)
