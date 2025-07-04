//논블로킹방식으로 작성한 코드
//이전 작업이 완료될때까지 대기하지x 다음 작업 수행
//setTimeout(callback, delay) 함수 사용 setTimeout(callback, delay
//콜백함수는 delay 시간 후에 실행됨

function longrunningTask() {
 //오래 걸리는 작업  ..3초
  console.log('작업 끝');
}

console.log('작업 시작');
//오래거리는 작업에 논블로킹 처리를 해주는 것이 좋다
//setTimeout을 사용하여 논블로킹 처리
//다음작업을 처리하면서 longrunningTask를 동시실행
//setTimeout은 비동기적으로 실행됨
setTimeout(longrunningTask, 0);
console.log('다음 작업');