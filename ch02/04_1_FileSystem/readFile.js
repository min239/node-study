const fs = require('fs')

//readfile(읽을 파일 경로, 콜백함수)
fs.readFile('./readme.txt', (err, data) => {
   //data: 파일내용
   //err: v파일을 읽는 도중 에러 발생시 에러 메세지
   if (err) {
      throw err
   }
   console.log(data) //이진데이터
   console.log(data.toString()) //문자로 변환
})
