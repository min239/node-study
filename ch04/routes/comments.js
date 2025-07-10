const express = require('express')
const router = express.Router()
const Comment = require('../models/comment') // Comment 모델을 불러옴, 데이터베이스에서 댓글 정보를 가져오기 위해 사용
const comment = require('../models/comment')
//새로운 댓글 등록
//localhost:8000/comments로 들어왔을 때 이 라우터가 실행됨
router.post('/', async (req, res, next) => {
   try {
      const comment = await Comment.create({
         commenter: req.body.id, // 요청 본문에서 id를 가져옴, 댓글 작성자의 id
         comment: req.body.comment, // 요청 본문에서 comment를 가져옴, 댓글 내용
      })
      console.log(comment) // 생성된 댓글 데이터를 콘솔에 출력
      res.status(201).json(comment) // 생성된 댓글 데이터를 JSON 형태로 응답
   } catch (error) {
      console.error(error)
      next(error) // app.js의 에러 처리 미들웨어로 전달됨
   }
})

//댓글 수정 //일부 수정 patch 전부수정 put
//localhost:8000/comments/:id로 들어왔을 때 이 라우터가 실행됨
//:id 댓글 아이디
router.patch('/:id', async (req, res, next) => {
   try {
      const result = await Comment.update(
         //쿼리 문 update comment set comment = '수정할 내용' where id = :id;
         {
            comment: req.body.comment, // 요청 본문에서 comment를 가져옴, 수정할 댓글 내용
         },
         {
            where: { id: req.params.id }, // req.params.id는 URL 파라미터에서 id 값을 가져옴, 특정 id의 댓글을 수정
         }
      )
      console.log(result) // 수정된 댓글 데이터를 콘솔에 출력

      if (result[0] === 0) {
         // result[0]은 수정된 행의 수를 나타냄, 0이면 수정된 댓글이 없음
         return res.status(404).json({ message: '댓글을 찾을 수 없습니다.' }) // 댓글이 없을 경우 404 응답
      }
      res.status(200).json({ message: '댓글이 수정되었습니다.', result }) // 댓글 수정 성공시 메시지 응답
   } catch (error) {
      console.error(error)
      next(error) // app.js의 에러 처리 미들웨어로 전달됨
   }
})

//댓글 삭제
//localhost:8000/comments/:id로 들어왔을 때 이 라우터가 실행됨
router.delete('/:id', async (req, res, next) => {
   //쿼리문 delete from comments where id = :id;
   try {
      const result = await Comment.destroy({
         where: { id: req.params.id }, // req.params.id는 URL 파라미터에서 id 값을 가져옴, 특정 id의 댓글을 삭제
      })

      console.log(result) // 삭제된 댓글의 수를 콘솔에 출력

      if (result === 0) {
         // result는 삭제된 행의 수를 나타냄, 0이면 삭제된 댓글이 없음
         return res.status(404).json({ message: '댓글을 찾을 수 없습니다.' }) // 댓글이 없을 경우 404 응답
      }

      res.json({ message: '댓글이 삭제되었습니다.', result }) // 댓글 삭제 성공시 메시지 응답
   } catch (error) {
      console.error(error)
      next(error) // app.js의 에러 처리 미들웨어로 전달됨
   }
})

module.exports = router
