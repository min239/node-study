//단반향 암호화: 복호화 할 수X
const crypto = require('crypto')

//64바이트의 salt를 생성,랜덤한 바이트 데이터를 생성함
//salt는 해시를 만들 때 사용되는 추가적인 문자열
crypto.randomBytes(64, (err, buf) => {
   //buf는 랜덤한 바이트 데이터
   console.log(buf) // <Buffer 9c 8f 1b 2d 3e 4f 5a 6b 7c ...>
   const salt = buf.toString('base64') //buf를 base64로 인코딩, ->이게 salt값
   console.log('salt: ', salt) // 9c8f1b2d3e4f5a6b7c...

   //salt와 sha512 알고리즘을 이용해 100000번 반복하여 비밀번호를 해시함
   crypto.pbkdf2('password111', salt, 100000, 64, 'sha512', (err, key) => {
      //pbkdf2: 비밀번호를 해시하는 함수
      //password111: 암호화할 비밀번호
      //salt: 위에서 생성한 salt
      //100000: 반복 횟수
      //64: 생성할 키의 길이
      //sha512: 해시 알고리즘
      console.log(key.toString('base64')) // base64로 인코딩된 해시 값 출력
   })
})
