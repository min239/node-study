const express = require('express')
const router = express.Router() //라우터(경로를 지정해준다)를 가져온다

//localhost:8000/user
router.get('/', (req, res) => {
   res.send('Hello, User!')
})

//localhost:8000/user/test
router.get('/test', (req, res) => {
   res.send('Hello, user test!')
})

//localhost:8000/user/?
//localhost:8000/user/person?page=1&lang=ko
router.get('/:id', (req, res) => {
   // ':id' 파라미터를 가진 경로로 GET 요청이 들어오면
   // req.params.id를 사용하여 'id' 파라미터의 값을 가져올 수 있다
   console.log(req.params) //path 파라미터
   console.log(req.query) //쿼리스트링
   console.loh(req.query.page) //쿼리스트링에서 'page' 파라미터의 값을 가져온다

   // req.params는 URL 경로에서 동적으로 변하는 부분을 객체 형태로 담고 있다
   // req.query는 쿼리스트링을 객체 형태로 담고 있다
   //req.query.page는 쿼리스트링에서 'page' 파라미터의 값을 가져온다
   res.send('Hello, user' + req.params.id) // 'id' 파라미터의 값을 응답으로 보낸다0
})

/*
//localhost:8000/user/cate/abc 들어갈때 실행

get요청
router.get('/cate/abc', (req, res) => {
   res.send('')
})

post요청
router.post('/cate/abc', (req, res) => {
   res.send('')
})
//위와 같이 get과 post 요청을 따로 작성할 수 있지만
//같은 경로로 get과 post 요청이 들어오는 경우 아래와 같이 하나로 작성가능   
*/

router
   .route('/cate/abc')
   .get((req, res) => {
      // '/cate/abc' 경로로 GET 요청이 들어오면
      res.send('GET /cate/abc')
   })
   .post((req, res) => {
      // '/cate/abc' 경로로 POST 요청이 들어오면
      res.send('POST /cate/abc')
   })

module.exports = router
//라우터를 모듈로 내보낸다
// 다른 파일에서 이 라우터를 사용할 수 있도록 export 한다
// app.js 파일에서 이 라우터를 import 해서 사용할 수 있다
