const fs = require('fs').promises

fs.readFile('./readme.txt')
   .then((data) => {
      console.log(data.toString()) // 문자로 변환
   })
   .catch((err) => {
      console.error(err) // 에러 처리
   })
// readFile은 프로미스를 반환하므로 then과 catch를 사용하여 결과를 처리할 수 있습니다.
// 이 코드는 비동기적으로 파일을 읽고, 읽은 내용을 문자열로 변환하여 출력합니다.
// 만약 파일을 읽는 도중 에러가 발생하면 catch 블록에서 에러를 처리합니다.
// 이 방식은 콜백을 사용하는 전통적인 방식보다 가독성이 높고, 에러 처리가 더 명확합니다. 

