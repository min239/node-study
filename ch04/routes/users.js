const express = require('express')
const User = require('../models/user') // User 모델을 불러옴, 데이터베이스에서 사용자 정보를 가져오기 위해 사용
const Comment = require('../models/comment') // Comment 모델을 불러옴, 데이터베이스에서 댓글 정보를 가져오기 위해 사용
const comment = require('../models/comment')
const router = express.Router()

//localhost:8000/users로 들어왔을 때 이 라우터가 실행됨
router.get('/', async (req, res, next) => {
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

//loclhost:8000/users/:id로 들어왔을 때 이 라우터가 실행됨
router.get('/:id', async (req, res, next) => {
   try {
      //select * from users where id = req.params.id;
      const user = await User.findAll({
         // User 모델에서 특정 id의 데이터를 가져옴
         // findAll은 여러 개의 데이터를 가져오는 메서드, 조건을 주면 해당 조건에 맞는 데이터를 가져옴
         where: { id: req.params.id }, // req.params.id는 URL 파라미터에서 id 값을 가져옴
         attributes: ['name', 'age'] // 가져올 컬럼을 지정 name, age 컬럼만 가져옴, 특정컬럼만 가져온다.
         // 예를 들어, /users/1로 요청하면 req.params.id는 1이 됨
         // 따라서, id가 1인 사용자의 데이터를 가져옴
      })
      console.log(user) // 가져온 데이터를 콘솔에 출력
      res.status(200).json(user) // 가져온 데이터를 JSON 형태로 응답
   } catch (error) {
      console.error(error)
      next(error) // app.js의 에러 처리 미들웨어로 전달됨
   }
})

// 특정 사용자가 작성한 모든 댓글 가져오기
//localhost:8000/users/:id/comments로 들어왔을 때 이 라우터가 실행됨
router.get('/:id/comments', async (req, res, next) => {
   /*
select *
from  comments c, users u
where c.commenter = u.id
and u.id = :id;  
   */
  try {
   //   const comments = await Comment.findAll({ // Comment 모델에서 특정 사용자의 모든 댓글을 가져옴 include를 사용하여 가져옴
   //    attributes: ['comment', 'create_at'], // 가져올 컬럼을 지정, 댓글 내용과 생성일자를 가져옴
   //    where: { commenter: req.params.id }, // req.params.id는 URL 파라미터에서 id 값을 가져옴, 댓글 작성자가 특정 id인 댓글만 가져옴
   //    //comments 테이블 데이터를 가져올 떄 특정 id를 가진 users 테이블 데이터를 포함해서 가져온다
   //    //include 안에 있는 건 user에 대한것만 작성
   //    include: {
   //       model:User, // User 모델을 포함하여 댓글과 사용자 정보를 함께 가져옴
   //       where: {id: req.params.id}, // req.params.id는 URL 파라미터에서 id 값을 가져옴
   //       attributes: ['name', 'age'], // 가져올 컬럼을 지정
   //    }
   //   })
      const comments = await User.findAll({ //user를 기준으로 댓글을 가져옴
         where: { id: req.params.id }, // req.params.id는 URL 파라미터에서 id 값을 가져옴
         attributes: ['name', 'age'], // 가져올 컬럼을 지정, name과 age 컬럼만 가져옴
         include: { // include를 사용하여 User 모델과 Comment 모델을 조인하여 가져옴
            model: Comment,  // User 모델에서 특정 사용자의 모든 댓글을 가져옴
            attributes: ['comment', 'created_at'], // 가져올 댓글 컬럼을 지정, 댓글 내용과 생성일자를 가져옴
         },
      })
     console.log(comments) // 가져온 댓글 데이터를 콘솔에 출력
     res.status(200).json(comments) // 가져온 댓글 데이터를 JSON 형태
  } catch (error) {
     console.error(error)
     next(error) // app.js의 에러 처리 미들웨어로 전달됨
  }
})

//특정 사용자 등록(insert)
//loclhost:8000/users로 POST 요청이 들어왔을 때 이 라우터가 실행됨
router.post('/', async(req, res, next) => {
   try {
      console.log(req.body) // 요청 본문을 콘솔에 출력

      const user = await User.create({
         name: req.body.name, // 요청 본문에서 name을 가져옴
         age: req.body.age, // 요청 본문에서 age를 가져옴
         married: req.body.married, // 요청 본문에서 married를 가져옴
         comment: req.body.comment, // 요청 본문에서 comment를 가져옴
      })
      console.log(user) // 생성된 사용자 데이터를 콘솔에 출력
      res.status(201).json(user) // 생성된 사용자 데이터를 JSON 형태로 응답, create 성공시에는 상태코드 201, 생성된 사용자 데이터 response
   } catch (error) {
      console.error(error)
      next(error) // app.js의 에러 처리 미들웨어로 전달됨
   }
})

module.exports = router
