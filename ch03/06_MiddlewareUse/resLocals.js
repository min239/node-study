const express = require('express')
require('dotenv').config()

const app = express()
app.set('port', process.env.PORT || 3000)

//첫번째 미들웨어
app.use((req, res, next) => {
   res.locals.appName = 'MyExpressApp' // res.locals에 appName을 추가
   res.locals.timestamp = new Date().toISOString() // 현재 시간을 ISO 형식으로 저장
   next() // 다음 미들웨어로 넘어간다
})

//두번쨰 미들웨어
app.use((req, res, next) => {
   console.log(`App Name: ${res.locals.appName}`) // res.locals에서 appName을 가져와서 출력
   console.log(`App timestamp: ${res.locals.timestamp}`) // res.locals에서 timestamp을 가져와서 출력
   next() // app.get(..)으로 이동한다
})
app.get('/', (req, res) => {
   res.send(` <h1> 환영합니다, ${res.locals.appName} </h1>`)
})
app.listen(app.get('port'), () => {
   console.log(`서버가 작동 중 입니다. http://localhost:${app.get('port')}`)
})
