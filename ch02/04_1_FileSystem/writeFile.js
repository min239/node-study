const fs = require('fs')

// writeFile(작성한파일경로, 작성할 내용, 콜백함수)
fs.writeFile('./writeme.txt', '클리 입력됩니다', (err) => {
    // err: 파일을 쓰는 도중 에러 발생시 에러 메세지
    if (err) {  //파일 쓰는 과정에서 문제 발생시 err 메세지 throw
        throw err
    }
    console.log('파일 쓰기 완료')

    // 파일 쓰기 완료 후 읽어오기
    fs.readFile('./writeme.txt', (err, data) => {
        console.log(data.toString()) // 문자로 변환
    })
})