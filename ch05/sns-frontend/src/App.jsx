import './styles/common.css'
import Navbar from './components/shared/Navbar'
import Home from './pages/Home'
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'

import { Route, Routes, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { checkAuthStatusThunk } from './features/authSlice'
import PostCreatePage from './pages/PostCreatePage'

function App() {
   const dispatch = useDispatch()
   const { isAuthenticated, user } = useSelector((state) => state.auth) // 로그인 상태, 로그인한 사용자 정보(로그아웃 상태일때는 null)
   //사용자 정보(로그아웃 상태일때는 null)
   const location = useLocation()
   //location.key: 현재 위치의 고유 키
   console.log('location.key:', location.key)

   // 새로고침시 redux 에서 사용하는 state가 사라지므로 지속적인 로그인 상태 확인을 위해 사용
   useEffect(() => {
      dispatch(checkAuthStatusThunk())
   }, [dispatch])
   return (
      <>
         <Navbar isAuthenticated={isAuthenticated} user={user} />
         <Routes>
            {/* 라우트 렌더링 시 key*를 동적으로 바꾸면 리텍트는 완전히 새로운 컴포넌트로 인식하고 언마운트 후*/}
            <Route path="/" element={<Home isAuthenticated={isAuthenticated} user={user} key={location.key} />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/posts/create" element={<PostCreatePage />} />
         </Routes>
      </>
   )
}

export default App
