const express = require('express') // express 모듈 불러오기
const path = require('path') // path 모듈 불러오기, 경로를 다루기 위한 모듈
const morgan = require('morgan') 
const { sequelize } = require('./models') //models/index.js에서 sequelize 인스턴스를 불러옴
require('dotenv').config()

//라우터 모듈 불러오기
const indexRouter = require('./routes') //index.js 파일을 불러옴, index.js는 생략가능
const usersRouter = require('./routes/users') //user.js 파일을 불러옴
const commentsRouter = require('./routes/comments') //comments.js 파일을 불러옴
const app = express()
app.set('port', process.env.PORT || 3000)

//데이터베이스 연결 설정
sequelize
   .sync({ force: false }) //force: true로 설정하면 기존 테이블을 삭제하고 새로 생성, false로 설정하면 기존 테이블이 있으면 그대로 사용, 데이터베이스에 이미 존재하는 테이블을 삭제하고 새로 생성할지 여부를 결정
   .then(() => { 
      console.log('데이터베이스 연결 성공') 
   })
   .catch((err) => {
      console.error(`데이터베이스 연결 실패: ${err}`)
   })

//공통 미들웨어 설정, 제일 먼저 실행되는 미들웨어
app.use(morgan('dev')) // 로그 출력 미들웨어
app.use(express.static(path.join(__dirname, 'public'))) // 정적 파일 제공, public 폴더를 기준으로 정적 파일을 제공
app.use(express.json()) // request 데이터를 json객체로 받아옴
app.use(express.urlencoded({ extended: false })) // URL 인코딩된 요청 본문을 파싱하는 미들웨어

//라우터 연결
app.use('/', indexRouter) //localhost:8000/로 들어왔을 때 indexRouter를 사용
app.use('/users', usersRouter) //localhost:8000/users로 들어왔을 때 usersRouter를 사용
app.use('/comments', commentsRouter) //localhost:8000/comments로 들어왔을 때 commentsRouter를 사용

//에러 처리 미들웨어
//1.요청 경로에 해당하는 라우터가 없을떄 (경로를 찾지 못했을 때)
app.use((req, res, next) => {
   const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`) //ex) get/test 라우터가 없습니다.
   error.status = 404 // not found 에러
   next(error) // 에러를 다음 미들웨어로 전달
})
//2.모든 에러처리
app.use((err, req, res, next) => {
   const status = err.status || 500 // 에러 상태 코드, 없으면 500
   const message = err.message || '서버 에러' // 에러 메시지

   //에러 정보를 response
   res.status(status).send(`
      <h1>${status} 에러</h1>
        <p>${message}</p>
    `)
})

app.listen(app.get('port'), () => {
   console.log(`서버가 작동 중 입니다. http://localhost:${app.get('port')}`)
})
