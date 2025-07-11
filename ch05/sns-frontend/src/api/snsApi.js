import axios from 'axios'

const BASE_URL = import.meta.env.VITE_APP_API_URL

//axios 인스턴스 생성
const snsApi = axios.create({
   baseURL: BASE_URL,
   headers: {
      'Content-Type': 'application/json', // request, response 할때 json 객체로 주고 받겠다
   },
   // localhost:5173 -> 프론트엔드
   // localhost:8000 -> 백엔드
   // request, response 주소가 다른경우 보안상 서로 통신 X
   // 주소가 다른데 통신하는 경우 cors 에러 발생
   // 주소가 다르면 쿠키와 세션도 주고받지 못하므로 아래 설정 필요
   withCredentials: true, // 세션이나 쿠키를 request에 포함
})

// 회원가입
export const registerUser = async (userData) => {
   try {
      // userData: 회원가입 창에서 입력한 데이터
      // localhost:8000/auth/join
      console.log('userData: ', userData)
      const response = await snsApi.post('/auth/join', userData)

      console.log('response: ', response) // response: {data: {user: {id, email, nick}}}
      // 회원가입 성공시 response.data.user에 사용자 정보가 담겨있음
      //resoponse데이터는 auth.js에서 설정한 데이터
      return response
   } catch (error) {
      // API 요청 중 오류가 발생한 경우 에러메시지 출력
      console.error(`API Request 오류: ${error.message}`)
      throw error //registerUser 함수에서 에러를 던져서 호출한 곳에서 처리할 수 있도록 함(authslice.js에서 처리)
   }
}

//로그인
export const loginUser = async (credentials) => {
   try {
      console.log('credentials: ', credentials)
      const response = await snsApi.post('/auth/login', credentials)

      console.log('response: ', response) // response: {data: {user: {id, email, nick}}} 로그인하면 이게 나옴 백엔트로  들어감
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error}`)
      throw error
   }
}
//로그아웃
export const logoutUser = async () => {
   try {
      const response = await snsApi.get('/auth/logout')
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error}`)
      throw error
   }
}
//로그인 상태 확인
export const checkAuthStatus = async () => {
   try {
      const response = await snsApi.get('/auth/status')
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error}`)
      throw error
   }
}
