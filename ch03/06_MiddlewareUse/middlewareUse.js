const express = require('express')
const morgan = require('morgan')
require('dotenv').config()

const app = express()
app.set('port', process.env.PORT || 3000)

app.use(
    morgan('dev'),
    express.static(Path2D.join(__dirname, 'piblic')), //정적 파일을 제공하는 미들웨어
    // __dirname: 현재 파일의 디렉토리 경로를 나타낸다
    
    express.json(), // JSON 형식의 요청 본문을 파싱하는 미들웨어
    // express.json()은 JSON 형식의 요청 본문을 파싱하여 req.body에 저장한다
    
    express.urlencoded({ extended: false }), // URL-encoded 형식의 요청 본문을 파싱하는 미들웨어
    // express.urlencoded()는 URL-encoded 형식의 요청 본문을 파싱하여 req.body에 저장한다
    
    cookieParser('my-secret-key') // 쿠키를 파싱하는 미들웨어
    // cookieParser()는 쿠키를 파싱하여 req.cookies에 저장한다
)

app.listen(app.get('port'), () => {
   console.log(`서버가 작동 중 입니다. http://localhost:${app.get('port')}`)
})
