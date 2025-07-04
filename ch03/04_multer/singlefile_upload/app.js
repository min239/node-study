const express = require('express') //웹 서버를 만들기 위한 프레임워크
const multer = require('multer') //파일 업로드를 위한 미들웨어
const path = require('path') //파일 경로를 다루기 위한 모듈
const fs = require('fs')  //파일 시스템을 다루기 위한 모듈
const morgan = require('morgan') //로그 남기는 패키지
require('dotenv').config() // env파일을 사용하기 위한 라이브러리

const app = express() 
app.set('port', process.env.PORT || 3000) 
// process.env.PORT: 환경변수 PORT가 있으면 그 값을 사용하고, 없으면 3000을 사용

app.use(morgan('dev')) // morgan 미들웨어를 사용하여 요청 로그를 콘솔에 출력
// 'dev'는 로그 형식을 지정하는 옵션으로, 개발 환경에 적합한 로그 형식입니다.
app.use('/', express.static(path.join(__dirname, 'public'))) // 정적 파일을 제공하기 위한 미들웨어
// __dirname: 현재 파일의 디렉토리 경로를 반환합니다. 
app.use(express.json()) // JSON 형식의 요청 본문을 파싱하기 위한 미들웨어
app.use(express.urlencoded({ extended: false })) // URL 인코딩된 요청 본문을 파싱하기 위한 미들웨어

// 업로드 폴더 확인 및 생성

try {
   fs.readdirSync('uploads') // uploads 폴더가 있는지 확인 
} catch (error) { 
   //폴더가 없으면 에러가 발생 
   console.log('upload 폴더가 없어 uploads 폴더를 생성합니다.') 
   fs.mkdirSync('uploads') // uploads 폴더를 생성
}

const upload = multer({ 
   storage: multer.diskStorage({

      //업로드 파일 저장 경로 설정
      destination(req, file, done) { 
         done(null, 'uploads/') //uploads 폴더에 저장
      },
      //저장할 파일 이름 설정
      filename(req, file, done) { 
         // file.originalname = dog.png
         // ext = .png
         const ext = path.extname(file.originalname) //파일 확장차 추출 
         //done(null, 어떤 파일명으로 저장할건지)
         //Date.now(): 중복되지 않는 파일명을 만들 수 있음
         //dog1734338282949483.png
         // done 콜백 함수는 첫 번째 인자로 에러를 받고, 두 번째 인자로 저장할 파일명을 받습니다.
         // path.basename(file.originalname, ext) = dog
         done(null, path.basename(file.originalname, ext) + Date.now() + ext) 
      
      },
   }),

   //업로드 파일 크기 제한(5MB)
   limits: { fileSize: 5 * 1024 * 1024 },
})

app.get('/upload', (req, res) => {  // 클라이언트가 업로드 폼을 요청할 때 multipart.html 파일을 응답
   // __dirname: 현재 파일의 디렉토리 경로를 반환합니다.
   // path.join(__dirname, 'multipart.html'): 현재 디렉토리와 multipart.html 파일 경로를 결합합니다.
   // res.sendFile: 지정한 파일을 클라이언트에게 전송합니다.
   res.sendFile(path.join(__dirname, 'multipart.html'))  // multipart.html 파일 응답
})

// name='image'인 파일 하나만 업로드
app.post('/upload', upload.single('image'), (req, res) => {  //
   console.log(req.file) //업로드된 파일 정보 출력
   res.send('파일 업로드 완료')
})

app.listen(app.get('port'), () => {
   console.log(`서버가 작동 중 입니다. http://localhost:${app.get('port')}`)
})
