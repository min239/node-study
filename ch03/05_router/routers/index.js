const express = require('express')
const router = express.Router() //라우터(경로를 지정해준다)를 가져온다

router.get(
   '/',
   (req, res, next) => {
      next('route') //다음 미들웨어로 넘어간다
   },
   (req, res, next) => {
      console.log('실행되지 않습니다')
      next() //다음 미들웨어로 넘어간다
   },
   (req, res, next) => {
      console.log('실행되지 않습니다')
      next() //다음 미들웨어로 넘어간다
   }
)

//localhost:8000/
router.get('/', (req, res) => {
   // '/' 경로로 GET 요청이 들어오면
   // req: 요청 객체, res: 응답 객체
   // req 객체는 요청에 대한 정보를 담고 있고, res 객체는 응답을 보내는 데 사용된다
   res.send('Hello, Express!')
})

//localhost:8000/test
router.get('/test', (req, res) => {
   // '/test' 경로로 GET 요청이 들어오면
   // req: 요청 객체, res: 응답 객체
   // req 객체는 요청에 대한 정보를 담고 있고, res 객체는 응답을 보내는 데 사용된다
   // res.send() 메서드를 사용하여 클라이언트에게 응답을 보낸다
   // res.send() 메서드는 문자열, 객체, 배열 등 다양한 형태의 데이터를 클라이언트에게 보낼 수 있다
   // 여기서는 문자열 'Hello, Express test!'를 클라이언트에게 보낸다
   res.send('Hello, Express test!')
})

//localhost:8000/?
router.get('/:id', (req, res) => {
   res.send('GET /' + req.params.id)
})

//localhost:8000/?/test, ?부분에 뭐든 들어올 수 있다
// 'id' 파라미터를 가진 경로로 GET 요청이 들어오면
// req.params.id를 사용하여 'id' 파라미터의 값을 가져올 수 있다
// req.params는 URL 경로에서 동적으로 변하는 부분을 객체 형태로 담고 있다
// 예를 들어, '/123' 경로로 요청이 들어오면 req.params.id는 '123'이 된다
// 이 경로는 '/test'와 같은 추가 경로를 처리할 수 있다
router.get('/:id/test', (req, res) => {
   // '/:id/test' 경로로 GET 요청이 들어오면
   // req.params.id를 사용하여 'id' 파라미터의 값을 가져올 수 있다
   res.send('GET /' + req.params.id + '/test')
})

module.exports = router //라우터를 모듈로 내보낸다
// 다른 파일에서 이 라우터를 사용할 수 있도록 export 한다
// app.js 파일에서 이 라우터를 import 해서 사용할 수 있다
