const a = true

//ES모듈은 특정조건절에서 사용X
// if (a) {
//    import './func.mjs' 
// }

//es 모듈을 특정 조건절에서 사용가능

if (a) {
   await import('./func.mjs')   
}



console.log('성공')
