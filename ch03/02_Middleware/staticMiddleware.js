const express = require('express')
const path = require('path')
require('dotenv').config()

const app = express()
app.set('port', process.env.PORT || 3000)

//3. static 미들웨어 사용: 정적파일에 바로 접근가능하게 하는 미들웨어
console.log(__dirname)
console.log(path.join(__dirname, 'public'))

/*
public은 정적파일을 저장하는 공간
public 풀더에서 정적파일을 찾는다.
정적파일: 서버에서 클라이언트로 그대로 전달되는 변경되지 않는 콘텐츠
주로 HTML, CSS, JavaScript, 이미지, 비디오, 폰트 파일 등
서버는 정적 파일을 요청받으면 파일을 클라이언트로 전달하는 역할만 합니다.
http://localhost:8000/poster.png
http://localhost:8000/dog.png
app.use('/image', express.static(path.join(__dirname, 'public'))) image 붙이면 중간에 http://localhost:8000/image/poster.png 붙여야 함
*/
app.use('/', express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
   res.send('홈페이지')
})

app.get('/about', (req, res) => {
   res.send('소개 페이지')
})

app.listen(app.get('port'), () => {
   console.log(`서버가 작동 중 입니다. http://localhost:${app.get('port')}`)
})
