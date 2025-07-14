import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/authSlice'
import postReducer from '../features/postSlice'

const store = configureStore({
   reducer: {
      auth: authReducer, // authSlice에서 만든 리듀서를 등록
      post: postReducer, // postSlice에서 만든 리듀서를 등록
   },
})

export default store
