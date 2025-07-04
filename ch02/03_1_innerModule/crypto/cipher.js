//양방향 암호화:암호화 한것을 다시 복호화 할 수있음, 이떄 반드시 key가 필요함
const crypto = require('crypto')

const algorithm = 'aes-256-cbc' // 암호화 알고리즘 종류
const key = 'abcdefghijklmnopqrstuvwxyz123456' // 암호화 키, 32바이트 길이의 문자열
const iv = '1234567890123456' // 초기화 벡터, 16바이트 길이의 문자열

/*
utf8: 사람이 읽을 수 있는 문자열을 컴퓨터가 알아볼 수 있는 이진데이터로 바꾸는 인코딩 방식

-한글,영어, 다른언어, 이모지 등 모든 문자 표현 가능
예) '암호화할 문장' -> <Buffer ec 93 20 ed 34 33 ..>

base64: 이진 데이터를 네트워크 상에서 안전하게 전송하기 위해 텍스트로 바꿈(텍스트이지만 아무의미x)
-이진데이터를 포함한 암호화 결과, 이미지, 파일 등을 텍스트로 바꿀떄 사용

*/



//암호화
const cipher = crypto.createCipheriv(algorithm, key, iv) // 암호화 객체 생성
let result = cipher.update('암호화할 문장', 'utf8', 'base64') // 암호화, 인코딩 2번
result+= cipher.final('base64') // 암호화 완료
console.log('암호화: ', result) // 암호화된 문자열 출력

//복호화
const decipher = crypto.createDecipheriv(algorithm, key, iv) // 복호화 객체 생성
let result2 = decipher.update(result, 'base64', 'utf8') // 복호화+ 디코딩
result2 += decipher.final('utf8') // 복호화 완료 
console.log('복호화: ', result2) // 복호화된 문자열 출력   