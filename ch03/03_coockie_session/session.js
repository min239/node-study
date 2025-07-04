const e = require('express')
const express = require('express')
const session = require('express-session')
require('dotenv').config()

const app = express()
app.set('port', process.env.PORT || 3000)

// 세션 설정
app.use(
   session({
      name: 'my-session-cookie', //세션 id를 저장하는 쿠키의 이름(자유롭게 지정가능)
      secret: 'your-secret-key', //세션을 암호화하는 키(자유롭게 지정가능)
      resave: false, //세션 데이터가 바뀌지 않아도 저장소(백엔드 서버 RANM 메모리)에 다시 저장할지 여부
      //초기화 되지 않는 세션이란? req.session이 처음 생성된 후, 세션 데이터가 변경되지 않은 상태를 의미, req.session으로 세션객체는 생성되었지만 그 안에 어떤 정보도 들어가 있는 않는 상태
      saveUninitialized: false, //초기화되지 않은 세션을 저장소에 저장할지 여부
      cookie: {
         maxAge: 1000 * 60 * 60, //세션 id를 저장하는 쿠키의 저장시간, 1시간으로 설정0
         secure: false, //true로 설정하면 HTTPS에서만 쿠키가 전송됨,
      },
   })
)
// 세션 값 저장
app.get('/set-session', (req, res) => {
   // 세션객체 자체는 서버에 저장되고, 클라이언트에는 세션 id를 저장하는 쿠키가 전송됨
   // 세션 객체에 값을 저장하면, 해당 세션 id를 가진 클라이언트는
   // 서버에 요청할 때마다 세션 id를 쿠키로 전송하고,
   // 서버는 해당 세션 id를 가진 세션 객체를 찾아서 값을 읽거나 쓸 수 있음
   // 세션 객체는 req.session으로 접근할 수 있음
   req.session.usename = '창민' //세션에 username이라는 키로 '창민'이라는 값을 저장
   req.session.usename = 'admin'
   res.send('세션 데이터가 저장되었습니다')
})

//세션 값 확인
app.get('/get-session', (req, res) => {
   const { username, role } = req.session //세션 객체에서 username과 role 값을 추출})
   console.log(req.session) //세션 객체를 콘솔에 출력
   //세션 객체에서 username과 role 값을 추출
   // const username = req.session.username //세션 객체에서 username 값을 추출
   // const role = req.session.role //세션 객체에서 role 값을 추출
   if (username && role) {
      //username과 role 값이 존재하는지 확인
      // 존재한다면 클라이언트에게 세션 id와 함께 username과 role 값을 전송
      // req.sessionID는 현재 세션의 id를 나타냄
      // req.sessionID는 세션 객체가 생성될 때 자동으로 생성됨

      res.send(`username: ${username}, role: ${role}, 세션 id: ${req.sessionID}`)
   } else {
      res.send('세션을 찹을 수 없습니다.')
   }
})

//세션 값 삭제
app.get('/destory-session', (req, res) => {
   req.session.destroy((err) => {
      if (err) {
         res.send(`세션 삭제 실패: ${err.message}`)
      } else {
        res.clearCookie('my-session-cookie') //세션 id를 저장하는 쿠키를 삭제   
         // 세션이 삭제되면, 클라이언트는 더 이상 해당 세션 id를 사용할 수 없음
         // 따라서 클라이언트는 세션이 삭제되었다는 것을 알 수 있음
         res.send('세션이 삭제되었습니다.')
         console.log('세션이 삭제되었습니다.')
      }
   })
})

app.listen(app.get('port'), () => {
   console.log(`서버가 작동 중 입니다. http://localhost:${app.get('port')}`)
})
