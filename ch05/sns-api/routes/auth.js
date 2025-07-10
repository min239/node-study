const express = require('express')
const bcrypt = require('bcrypt') // 비밀번호 암호화를 위한 bcrypt 모듈
const router = express.Router()
const User = require('../models/user') // User 모델 불러오기

//회원가입 localhost:8000/auth
router.post('/join', async (req, res, next) => {
   try {
      const { email, nick, password } = req.body // 클라이언트에서 전달된 회원가입 정보
      // 이메일, 닉네임, 비밀번호가 모두 존재하는지 확인
      //select * from users where email = ? limit 1;
      const exUser = await User.findOne({
         where: { email },
      })
      // 이미 사용자가 존재할 경우 409 상태코드와 메세지를 json 객체로 전달
      if (exUser) {
         return res.status(409).json({
            message: '이미 사용 중인 이메일입니다.',
         })
      }
      //이메일 중복 확인을 통과시 새로운 사용자 계정 생성

      // 비밀번호 암호화
      const hash = await bcrypt.hash(password, 12) // 12는 salt(해시 암호화를 진행시 추가되는 임의의 데이터 주로 10~12 정도의 값이 권장됨)

      //새로운 사용자 생성
      const newUser = await User.create({
         email,
         nick,
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
      error.message = '회원가입 중 오류가 발생했습니다.' // 에러 메시지 설정
      next(error) // 에러가 발생하면 다음 미들웨어로 전달
   }
})

module.exports = router
