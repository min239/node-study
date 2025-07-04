const express = require('express')
require('dotenv').config() //env파일을 사용하기 위한 라이브러리 로드

const app = express()
app.set('port', process.env.PORT || 3000) //포트번호 지정,

//http://localhost:8000/로 request가 온 경우 실행, get은 어떤 데이트를 받음
app.get('/', (req, res) => {
   //작성된 콜백함수는 requset가 들어오면 콜백함수 부분의 코드를 실행한다
   //req:requst 요청에 대한 정보가 들어있음
   //res:respond 응답을 처리하는 객체
   //console.log('수정')- nodemon 사용시 자동으로 실행해줌,수정할 때 마다 실행
   res.send('안녕! node express!') //클라이언트에게 응답을 보낸다
})
//http://localhost:8000/로 post reaust(데이터를 생성해줘)가 온경우 실행
// app.post('/', (req, res) => {
//     res.send('안녕! node express!')
//  })
//http://localhost:8000/test로 request가 온 경우 실행
app.get('/test', (req, res) => {
   res.send('안녕! test!') //클라이언트에게 응답을 보낸다
})

//listen:서버가 계속 동작시킴
app.listen(app.get('port'), () => {
   console.log(`서버가 작동 중입니다.. http://localhost:${app.get('port')}`)
})
