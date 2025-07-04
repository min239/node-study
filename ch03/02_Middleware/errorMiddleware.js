const express = require('express')
require('dotenv').config()

const app = express()
app.set('port', process.env.PORT || 3000)

app.get('/', (req, res) => {
   res.send('환영합니다')
})

app.get('/error', (req, res, next) => {
   const err = new Error('에러발생') //강제로 에러 발생(에러가 발생했다고 가정)
   err.status = 500 //http 상태코드
   next(err) //에러객체를 넘기거 있으므로 에러처리 미들웨어로 이동
   
})

//에러처리 미들웨어
app.use((err, req, res, next) => {
   //에러메시지를 출력
   console.log('Error:', err.message)

   //상태코드와 에러메세지를 json객체로 클라이언트에게 전달
   res.status(err.status).json({
      //res-> json객체를 응답해준다 status는 상태코드도 같이 전달(500값이 들어있다)
      error: {
         message: err.message, //응답해주는 메시지가 500
      },
   })
})

app.listen(app.get('port'), () => {
   console.log(`서버가 작동 중 입니다. http://localhost:${app.get('port')}`)
})
