const fs = require('fs').promises

fs.writeFile('./writeme.txt', '글이 입력됩니다')
   .then(() => {
      console.log('파일 쓰기 완료')
      return fs.readFile('./writeme.txt') // 파일 읽기
   })
   .then((data) => {
      console.log(data.toString()) // 문자로 변환, 읽은 파일 내용 출력
   })
   .catch((err) => {
      console.error(err) // 에러 처리
   })
