const express = require('express')
require('dotenv').config()

const app = express()
app.set('port', process.env.PORT || 3000)

//로그 미들웨어
const logMiddleware = (req, res, next) => {
   console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`) //요청 시간, 메소드, URL을 로그로 남긴다, 
   next() //app.get('/secure', (...) => {...})로 넘어간다
}

//인증 미들웨어
const authMiddleware = (req, res, next) => {
   const token = '12345' 
   if (token === '12345') {
      //토큰이 일치하지 않으면 인증 실패
      console.log('인증성공!') // 인증 성공 로그
      next() //  인증성공 시 다음 미들웨어로 넘어간다 -> 여기로 감 app.use(logMiddleware
   }
}

//localhost:8000/secure
app.use((req, res, next) => {
   console.log(req.path) //요청 경로를 로그로 남긴다
   //'/secure' 경로로 들어오면 인증 미들웨어를 실행한다
   if (req.path === '/secure') {
      //    '/secure' 경로로 들어오면 인증 미들웨어를 실행한다
      authMiddleware(req, res, next) //인증 미들웨어를 실행한다, 첫번째로 여기로 온다 참이니까 authMiddleware(req, res, next) 실행
   } else {
      next() //'/secure' 경로가 아니면 다음 미들웨어로 넘어간다
   }
})

app.use(logMiddleware) //로그 미들웨어를 사용한다

//localhost:8000
app.get('/', (req, res) => {
   res.send('환영합니다')
})

//localhost:8000/secure
app.get('/secure', (req, res) => {
   res.send('당신은 secure route에 접근했습니다!')
})

app.listen(app.get('port'), () => {
   console.log(`서버가 작동 중 입니다. http://localhost:${app.get('port')}`)
})

//실행순서
// 1. 클라이언트가 '/secure' 경로로 요청을 보낸다
// 2. 서버는 요청을 받고, 첫번째 미들웨어에서 요청 경로를 로그로 남긴다
// 3. '/secure' 경로이므로 인증 미들웨어가 실행된다
// 4. 인증 미들웨어에서 토큰을 확인하고, 인증 성공 로그를 남긴다
// 5. 인증이 성공하면 다음 미들웨어로 넘어가고, 로그 미들웨어가 실행된다
// 6. 로그 미들웨어에서 요청 시간, 메소드, URL을 로그로 남긴다
// 7. 마지막으로 '/secure' 경로에 대한 응답이 클라이언트로 전송된다
// 8. 클라이언트는 응답을 받고, '당신은 secure route에 접근했습니다!'라는 메시지를 표시한다
// 9. 만약 '/secure' 경로가 아닌 다른 경로로 요청을 보낸다면, 인증 미들웨어는 실행되지 않고 로그 미들웨어만 실행된다
// 10. '/secure' 경로가 아닌 경우, 로그 미들웨어에서 요청 시간, 메소드, URL을 로그로 남긴다
// 11. 마지막으로 해당 경로에 대한 응답이 클라이언트로 전송된다
// 12. 클라이언트는 응답을 받고, 해당 경로에 대한 메시지를 표시한다
// 13. 이 과정을 통해 인증 미들웨어와 로그 미들웨어가 어떻게 작동하는지 이해할 수 있다
// 14. 이 예제는 미들웨어의 순서와 작동 방식을 보여준다
// 15. 미들웨어는 요청과 응답 사이에 실행되는 함수로, 요청을 처리하기 전에 실행된다
// 16. 미들웨어는 요청을 가로채고, 필요한 작업을 수행한 후, 다음 미들웨어로 넘어갈 수 있다
// 17. 미들웨어는 요청을 처리하는 데 필요한 공통 작업을 수행할 수 있다