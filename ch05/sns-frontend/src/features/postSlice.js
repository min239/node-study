import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { createPost } from '../api/snsApi'
//게시물 등록
export const createPostThunk = createAsyncThunk('posts/createPost', async (postData, { rejectWithValue }) => {
   try {
      console.log('postData: ', postData) // postData는 게시물 작성 폼에서 입력한 데이터
      const response = await createPost(postData) // postData는 게시물 작성 폼에서 입력한 데이터 

      console.log(response) // response: {data: {post: {id, content, img, userId}}} 게시물 등록 성공시 이 데이터가 반환됨
      // response.data.post에 등록된 게시물 정보가 담겨있음
      // post.js의 res.status(200).json({ post: { id, content, img, userId } })와 일치해야 한다
      return response.data.post
   } catch (error) { 
      return rejectWithValue(error.response?.data?.message) // API 요청 중 오류가 발생한 경우 에러 메시지를 반환
      // error.response?.data?.message는 백엔드에서 설정한 에러 메시지, action.payload로 전달됨
   }
})

// //게시물 수정
// export const updatePostThunk = createAsyncThunk('posts/updatePost', async (data, { rejectWithValue }) => {
//    try {
//    } catch (error) {
//       return rejectWithValue(error.response?.data?.message)
//    }
// })

// //게시물 삭제
// export const deletePostThunk = createAsyncThunk('posts/deletePost', async (id, { rejectWithValue }) => {
//    try {
//    } catch (error) {
//       return rejectWithValue(error.response?.data?.message)
//    }
// })
// //특정 게시물 가져오기
// export const fetchPostByIdThunk = createAsyncThunk('posts/fetchPostById', async (id, { rejectWithValue }) => {
//    try {
//    } catch (error) {
//       return rejectWithValue(error.response?.data?.message)
//    }
// })
// //전체 게시물 가져오기
// export const fetchPostsThunk = createAsyncThunk('posts/fetchPosts', async (page, { rejectWithValue }) => {
//    try {
//    } catch (error) {
//       return rejectWithValue(error.response?.data?.message)
//    }
// })
const postSlice = createSlice({
   name: 'posts',
   initialState: {
      post: null, //게시글 데이터
      loading: false,
      error: null,
   },
   reducers: {},
   extraReducers: (builder) => {
      //게시물 등록
      builder
         .addCase(createPostThunk.pending, (state) => {
            state.loading = true
            state.error = null 
         })
         .addCase(createPostThunk.fulfilled, (state, action) => {
            state.loading = false
            state.post = action.payload //등록한 게시물 데이터
         })
         .addCase(createPostThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload //PostCreateForm에서 에러 메시지를 표시하기 위해 사용
            
         })
   },
})

export default postSlice.reducer
