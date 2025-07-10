const express = require('express')
const User = require('../models/user')
const router = express.Router()


router.get('/', async (req, res, next) => {
   //localhost:8000/로 들어왔을 때 index.js의 라우터가 실행됨
   //select * from users;
   try {
      const users = await User.findAll() //User 모델에서 모든 데이터를 가져옴
      console.log('users:', users) //가져온 데이터를 콘솔에 출력

      //200:성공
      //json형태로 response
      res.status(200).json(users) //가져온 데이터를 JSON 형태로 응답
   } catch (error) {
      console.error(error)
      next(error) // app.js의 에러 처리 미들웨어로 전달됨
   }
})

module.exports = router
