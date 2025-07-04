const express = require('express')
const morgan = require('morgan')
require('dotenv').config()

const app = express()
app.set('port', process.env.PORT || 3000)
app.use(morgan('dev'))

//라우팅:경로를 지정
const indexRouter = require('./routers/index') //index.js 라우터를 가져온다, 
const userRouter = require('./routers/user') //index.js 라우터를 가져온다, 

//미들웨어에 등록해야 동작한다
//미들웨어: 요청과 응답 사이에 실행되는 함수, 요청을 처리하기 전에 실행된다
//라우터를 미들웨어로 등록하여 경로를 지정한다
app.use('/', indexRouter) //루트 경로로 들어오면 index.js 라우터를 사용한다, localhost:8000/
//index.js 라우터는 '/' 경로로 GET 요청이 들어오면 'Hello, Express!'를 응답한다
app.use('/user', userRouter) //'/user' 경로로 들어오면 user.js 라우터를 사용한다, localhost:8000/user
//user.js 라우터는 '/' 경로로 GET 요청이 들어오면 'Hello, User!'를 응답한다

app.listen(app.get('port'), () => {
   console.log(`서버가 작동 중 입니다. http://localhost:${app.get('port')}`)
})
