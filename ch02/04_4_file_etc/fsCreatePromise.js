const fs = require('fs').promises
const constants = require('fs').constants //constants:파일 시스템 관려 상수를 가져온다

fs.access('./folder', constants.F_OK | constants.W_OK | constants.R_OK) //./folder풀더에 대한 접근권한이 있는지 확인
   //constants.F_OK: 파일존재 여부  constants.W_OK: 쓰기 권한 여부 constants.R_OK: 읽기 권한 확인
   //권한들이 없다면 에러 발생
   .then(() => {
      //풀더가 이미 있는 경우 reject 처리
      return Promise.reject('이미 풀더가 있음') // Promise.reject:거절 reject하면 catch로감
   })
   .catch((err) => {
      //풀더가 없는 경우
      if (err.code === 'ENOENT') {
         //풀더 생성
         console.log('풀더 없음')
         return fs.mkdir('./folder')
      }

      console.log('err1:', err)
      return Promise.reject(err) //풀더가 없는 것 외에 다른 에러 발생시 에러를 그대로 전달, 밑에 있는 catch로 감
   })
   .then(() => {
      //풀더 생성이 성공했을 때
      console.log('풀더만들기 성공')
      //file.js 파일생성
      //두번째 인수(어떤 동작으로 파일을 만들건지) => w:쓰기모드, r:읽기모드, a:기존파일에 추가
      return fs.open('./folder/file.js', 'w')
   })
   .then((fd) => {
      // 파일 생성이 성공 했을 때
      console.log('빈 파일 만들기 성공', fd)
      //생성한 파일의 이름을 file.js -> newFile.js로 변경
      return fs.rename('./folder/file.js', './folder/newFile.js')
   })
   .then(() => {
      //파일 이름 바구기 성공했을 때
      console.log('이름 바꾸기 성공')
   })
   .catch((err) => {
      //모든 단계에서 발생한 에러처리
      console.error('err2:', err)
   })
