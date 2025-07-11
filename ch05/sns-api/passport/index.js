const passport = require('passport')
const local = require('./localStrategy')
const User = require('../models/user')

//passport에 로그인 인증과정,직렬화,역직렬화를 등록해준다
module.exports = () => {
   //직렬화(serializeUser): 로그인 성공 후 사용자 정보를 세션에 저장
   passport.serializeUser((user, done) => {
      console.log('✅user:', user) //사용자 정보가 콘솔에 출력됨
      done(null, user.id) //user테이블의 id 값(pk)을 세션에 저장(세션 용량을 절약을 위해 id만 저장)
   })
   //역직렬화(deserializeUser): 클라이언트에게 requst가 올 떄 마다 세션에 저장된 사용자 id(user 테이블의 id컬럼 pk값)를 바탕으로 사용자 정보를 조회
   passport.deserializeUser(async (id, done) => {
      //id는 직렬화 해서 저장한 user.id값
      //response 해주고 싶은 사용자 정보를 기져온다
      //select id, nick, email, createdAt, updatedAt from users where id = ? limit 1
      User.findOne({
         where: { id },
         attributes: ['id', 'nick', 'email', 'createdAt', 'updatedAt'], //id, nick, email, createdAt, updatedAt 컬럼만 조회
      })
         .then((user) => done(null, user)) //성공시 가져온 사용자 객체 정보를 반환
         .catch((err) => done(err)) //에러 발생시 에러 반환
   })

   local() //localStrategy.js에서 export된 함수(인증과정함수)를 passport에 추가
    //passport에 추가된 localStrategy를 사용하여 로그인 인증을 처리

}
