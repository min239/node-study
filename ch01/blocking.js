//블로킹방식으로 작성한 코드
//이전 작업이 끝나야 다음 작업이 실행됨

function longrunningTask() {
 //오래 걸리는 작업  ..3초
  console.log('작업 끝');
}

console.log('작업 시작');
longrunningTask();
console.log('다음 작업');