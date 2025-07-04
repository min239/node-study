const express = require('express')
require('dotenv').config()

const app = express()
app.set('port', process.env.PORT || 3000)

//미들웨어 1.전역 미들웨어: 모든request에서 동작하는 미들웨어
//*  request - 미들웨어 - response 중간에서 동작  모든request는 미들웨어로 온다
app.use((req, res, next) => {
   //req:요청에 대한 정보가 들어있는 객체
   //res:응답을 처리하는 객체
   console.log(`${req.method} ${req.url}`)
   console.log('미들웨어 1실행')
   next()  //다음 미들웨어로 이동시켜 준다
})

app.use((req, res, next) => {
   console.log('미들웨어 2실행')
   next() //response 해주는 콜백함수로 이동
})

app.get('/', (req, res) => {
   //respond
   console.log('홈페이지')
   res.send('홈페이지')
})

app.get('/about', (req, res) => {
   console.log('소개 페이지')
   res.send('소개 페이지')
})

app.listen(app.get('port'), () => {
   console.log(`서버가 작동 중 입니다. http://localhost:${app.get('port')}`)
})
