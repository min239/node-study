import{ createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { registerUser } from '../api/snsApi'

/*
? (optional chaining)
error = {  } response가 undefined인 상태
error.response.data 사용시 ,TypeError: (Cannot read properties of undefined)발생
error.response
*/

//회원가입
export const registerUserThunk = createAsyncThunk('auth/registerUser',async(userData, {rejectWithValue}) => {
    //userData: 회원가입 정보
    try {
    const response = await registerUser(userData)
    return response.data.user//회원가입 성공시 사용자 정보 반환, auth.js에서 user 가지고옴
    } catch (error) {
        return rejectWithValue(error.response?.data?.message) //catch문에서 에러를 처리
        // error.response?.data?.message: 에러 메시지 -> auth.js에서 이미 존재하는 사용자입니다
    }
})
const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null, // 사용자 정보객체
        isAuthenticated: false, //로그인 상태 (true:로그인, false:로그아웃)
        loading: false,
        error: null,
    },
     reducers: {},
     extraReucers: (builder) => {
        builder
           .addCase(registerUserThunk.pending, (state) => {
            state.loading = true
            state.error = null
           })
           .addCase(registerUserThunk.pending, (state, action) => {
            state.loading = false
            state.user = action.payload //회원가입 성공시 사용자 정보 저장, auth.js에서 가지왔던 데이터 user에 들어감
            
           })
           .addCase(registerUserThunk.pending, (state, action) => {
              state.loading = false
              state.error = action.payload //회원가입 실패시 에러 메시지 저장 이미 존재하는 사용자입니다
           })

     },
})

export default authSlice.reducer