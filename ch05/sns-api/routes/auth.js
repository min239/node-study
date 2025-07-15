const express = require('express')
const passport = require('passport') // 인증 미들웨어
const bcrypt = require('bcrypt') // 비밀번호 암호화를 위한 bcrypt 모듈
const router = express.Router()
const User = require('../models/user') // User 모델 불러오기
const { isLoggedIn, isNotLoggedIn } = require('./middlewares')

//회원가입 localhost:8000/auth/join
// 로그인이 안된 상태일때만 회원가입을 진행하도록 한다
router.post('/join', isNotLoggedIn, async (req, res, next) => {
   /*req.body에는 클라이언트에서 전달된 회원가입 정보가 담겨있음
   예: {email: , nick:, password:}
    */
   try {
      console.log(req.body)
      const { email, nick, password } = req.body // 클라이언트에서 전달된 회원가입 정보
      // 이메일, 닉네임, 비밀번호가 모두 존재하는지 확인
      //select * from users where email = ? limit 1;
      const exUser = await User.findOne({
         where: { email },
      })
      // 이미 사용자가 존재할 경우 409 상태코드와 메세지를 json 객체로 전달
      if (exUser) {
         const error = new Error('이미 존재하는 사용자입니다.') //에러객체 생성
         error.status = 409 // Conflict
         return next(error) //에러미들웨어로 전달(app.js에서 설정한 에러 미들웨어로 전달)
      }
      //이메일 중복 확인을 통과시 새로운 사용자 계정 생성

      // 비밀번호 암호화
      const hash = await bcrypt.hash(password, 12) // 12는 salt(해시 암호화를 진행시 추가되는 임의의 데이터 주로 10~12 정도의 값이 권장됨)

      //새로운 사용자 생성
      const newUser = await User.create({
         email, //:email생략,
         nick, //:nick생략,
         password: hash, // 암호화된 비밀번호 저장
      })

      //성공 응답 반환
      res.status(201).json({
         success: true,
         message: '사용자가 성공적으로 등록되었습니다',
         //insert 한 데이터 일부 전달
         user: {
            id: newUser.id,
            email: newUser.email,
            nick: newUser.nick,
         },
      })
   } catch (error) {
      //에러발생시 미들웨어로 전달
      error.status = 500 // 상태코드 설정
      error.message = '회원가입 중 오류가 발생했습니다.' // 에러 메시지 설정
      next(error) // 에러가 발생하면 에러 미들웨어로 전달(app.js에서 설정한 에러 미들웨어로 전달)
   }
})

//로그인 localhost:8000/auth/login 버튼누르면 여기로
// 로그인이 안된 상태일때만 로그인을 하도록 한다
router.post('/login', isNotLoggedIn, async (req, res, next) => {
   passport.authenticate('local', (authError, user, info) => {
      //authenticate은 localStrategy를 사용하여 인증을 수행, 함수는 localStrategy.js에 작성한 인증과정을 실행!! 한다. 그 과정에서 에러발생시 authError객체에 값을 주고, 인증 과정 성공시 user에는 인증과정에서 passport에 넘겨줬던 exUser값이 들어있다
      if (authError) {
         authError.status = 500 //err.status에 500을 넣어 에러 미들웨어에서 500 상태코드로 응답할 수 있도록 한다
         authError.message = '인증 중 오류 발생'
         return next(authError) //에러미들 로 전달(app.js에서 설정한 에러 미들웨어로 전달)
      }
      if (!user) {
         //비밀번호 불일치 or 사용자가 없을 경우 info.message를 사용해서 메세지 전달
         //401:unauthorized,로그인 과정에서 인증이 안된경우 사용
         const err = new Error(info.message || '로그인 실패') //객체가 없기떄문에 만들어야함
         err.status = 401 // Unauthorized
         return next(err) //에러미들 로 전달(app.js에서 설정한 에러 미들웨어로 전달)
      }
      //인증이 정상적으로 되고 사용자를 로그인 상태로 바꿈 exUser값이 user에 담겨있다

      req.login(user, (loginError) => {
         if (loginError) {
            //로그인 상태로 바꾸는 중 오류 발생 시
            loginError.status = 500
            loginError.message = '로그인 중 오류 발생'
            return next(loginError)
         }

         //로그인 성공시 user객체와 함꼐 response
         res.status(200).json({
            success: true,
            message: '로그인 성공',
            user: {
               id: user.id,
               nick: user.nick,
            },
         })
      })
   })(req, res, next)
})
//로그아웃localhost:8000/auth/logout
// 로그인이 된 상태일때만 로그아웃을 하도록 한다
router.get('/logout', isLoggedIn, async (req, res, next) => {
   req.logout((logoutError) => {
      if (logoutError) {
         //로그아웃 상태로 바꾸는 중 에러 발생시
         logoutError.status = 500
         logoutError.message = '로그아웃 중 오류 발생'
         return next(logoutError)
      }
      //로그아웃 성공시 셰션에 저장되어 있던  사용자 id는 삭제된다.
      //로그아웃 성공시 response
      res.status(200).json({
         success: true,
         message: '로그아웃 성공',
      })
   })
})

//현재 로그인 상태 확인 localhost:8000/auth/status
router.get('/status', async (req, res, next) => {
   try {
      if (req.isAuthenticated()) {
         //isAuthenticated()는 passport에서 제공하는 함수로 현재 사용자가 로그인 상태인지 확인하는 함수
         //req.isAuthenticated()가 true이면 로그인 상태, false이면 로그인 상태가 아님
         //로그인 되었을 때
         //req.user는 passpaort의 역직렬화 설정에 의해 로그인 되었을 떄 로그인 한 user정보를 가져온다

         res.status(200).json({
            isAuthenticated: true, //로그인 상태
            user: {
               id: req.user.id, //passport에 저장된 사용자 정보, 'id', 'nick', 'email', 'createdAt', 'updatedAt'에서 id와 nick만 사용
               nick: req.user.nick, //passport에 저장된 사용자 정보
            },
         })
      } else {
         //로그인이 되지 않았을 떄
         res.status(200).json({
            isAuthenticated: false, //로그인 상태가 아님
         })
      }
   } catch (error) {
      error.status = 500
      error.message = '로그인 상태확인 중 오류가 발생했습니다.'
      next(error) //에러가 발생하면 에러 미들웨어로 전달(app.js에서 설정한 에러 미들웨어로 전달)
   }
})
module.exports = router
