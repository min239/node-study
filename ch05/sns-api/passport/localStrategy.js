const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const User = require('../models/user')

//로그인 시 사용자 정보를 DB에서 조회하고 사용자 존재 여부와 비밀번호 비교(인증과정)
module.exports = () => {
   passport.use(
      new LocalStrategy(
         {
            //input태그에서 name으로 사용되는 이름을 지정 Login.jsx에서 사용한 이름과 동일하게 설정
            //req.body = {email: '사용자가 입력한 이메일', password: '사용자가 입력한 비밀번호'}
            usernameField: 'email', //req.body.email = email
            passwordField: 'password', //req.body.password = password
         },
         //실제로그인 인증 로직
         async (email, password, done) => {
            //email: 사용자가 입력한 email값을 가져다 준다
            //password: 사용자가 입력한 password값을 가져다 준다
            try {
               //1.이메일로 사용자 조회
               //sleect * from users where email = ? limit 1
               const exUser = await User.findOne({ where: { email } })

               //2 이메일 해당하는 사용자가 있으면 비밀번호가 맞는지 확인
               if (exUser) {
                  //사용자가 입력한 비번과 db에서 가져온 비번 비교
                  const result = await bcrypt.compare(password, exUser.password) //비밀번호 비교
                  if (result) {
                     //비밀번호가 일치하면 사용자 개체를 pssport에 반환
                     done(null, exUser) //로그인 성공, done에 null과 사용자 정보(exUser)를 전달
                  } else {
                     //비밀번호가 일치하지 않는 경우 message를 passport에 반환
                     done(null, false, { message: '비밀번호가 일치하지 않습니다.' }) //비밀번호가 일치하지 않으면 done에 null과 false, 에러 메시지를 전달
                  }
               } else {
                  //3 이메일에 해당하는 사용자가 없으면 메시지를 passport에 반환
                  done(null, false, { message: '가입되지 않은 회원입니다.' }) //사용자가 존재하지 않으면 done에 null과 false, 에러 메시지를 전달
               }
            } catch (error) {
               console.error(error)
               done(error) //passport에 에러 객첼를 전달 -> 이후passport에서 에러 미들웨어로 전달
            }
         }
      )
   )
}
