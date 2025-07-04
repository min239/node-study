const EventEmitter = require('events')

//이벤트 객체 생성
const myEvent = new EventEmitter()

//event1 추가
myEvent.addListener('event1', () => {
   console.log('이벤트1')
})
//event2에 리스너 2개 추가
myEvent.on('event2', () => {
   console.log('이벤트2')
})
myEvent.on('event2', () => {
   console.log('이벤트2 추가')
})
myEvent.once('event3', () => {
   console.log('이벤트3')
})

//이벤트 호출
myEvent.emit('event1')
myEvent.emit('event1')
myEvent.emit('event2')
myEvent.emit('event3')
myEvent.emit('event3') //실행x (once로 등록된 이벤트는 한번만 실행가능)

myEvent.on('event4', () => {
   console.log('이벤트4')
})

//이벤트제거
myEvent.removeAllListeners('event4') //모든 이벤트 제거
myEvent.emit('event4') //실행안됨

const listerner = () => {
   console('이벤트5')
}

myEvent.on('event5', listerner)

myEvent.removeListener('event5', listerner) //특정 이벤트 제거
myEvent.emit('event5') //실행안됨

//이벤트 리스너의 갯수 출력
console.log(myEvent.listenerCount('event2'))
