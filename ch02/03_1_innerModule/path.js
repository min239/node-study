const path = require('path')

console.log('경로 정보------------')
console.log(path.sep) //경로 구분자,윈도우즈는 \, 리눅스/유닉스는 /

const string = __filename //현재 파일의 경로
console.log(string) //현재 파일의 경로

console.log('경로 분석------------')
console.log(path.dirname(string)) //풀더경로
console.log(path.extname(string)) //파일의 확장자
console.log(path.basename(string)) //파일의 이름
console.log(path.basename(string, 'js')) //파일의 이름에서 확장자를 제외한 이름

console.log('경로 조작------------')
console.log(path.parse(string)) //파일경로 분리

//parse()로 분리된 경로를 다시 합치기
console.log(
   path.format({
      root: 'C:\\',
      dir: 'C:\\project\\04.Nodejs\\node_study\\ch02\\03_1_innerModule',
      base: 'path.js',
      ext: '.js',
      name: 'path',
   })
)

//슬래시나 역슬래시를 실수로 사용하거나 여러번 사용했을 때 정상적인 결과를 얻기 위해 경로를 정규화
console.log(path.normalize('C://project//node_class\\ch02\\03_1_innerModule')) //경로 정규화,경로 구분자를 통일, 윈도우즈는 \, 리눅스/유닉스는 /

console.log('경로 성격 확인------------')
//절대경로인지 상대경로인지 알려줌
console.log(path.isAbsolute('C:\\')) //절대경로, 윈도우즈
console.log(path.isAbsolute('/home')) //절대경로, 리눅스/유닉스

console.log('경로 계산------------')
//경로 두개 중 첫 번째 경로에서 두번쨰 경로로 가는 법을 알려줌
console.log(path.relative('C:\\project\\node_class\\ch02\\03_1_innerModule\\path.js', 'C:\\')) //상대경로, 현재 경로에서 C:\까지의 상대경로를 계산
console.log(path.join('C:project/node', '/users', '/ezen')) //경로 합치기, 윈도우즈는 \, 리눅스/유닉스는 /, 경로를 합칠 때 경로 구분자를 자동으로 처리