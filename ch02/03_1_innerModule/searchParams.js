const url = require('url')
const myURL = new URL('http://www.gilbut.co.kr/?page=3&limit=10&category=nodejs&category=javascript') //&fileter=es3추가가 됨

console.log(myURL.searchParams) //URLSearchParams 객체
console.log(myURL.searchParams.getAll('category')) //category 파라미터의 값
console.log(myURL.searchParams.get('limit')) //limit 파라미터의 값
console.log(myURL.searchParams.get('page')) //page 파라미터의 값
console.log(myURL.searchParams.has('page')) //page 파라미터가 있는지 확인,쿼리스트링 내부에 해당 파라메터가 있는지 확인

console.log('키와 값을 가저옴------------')
console.log(myURL.searchParams.keys()) //키를 가져옴,URLSearchParams 객체의 키를 가져옴
console.log(myURL.searchParams.values()) //값을 가져옴,URLSearchParams 객체의 값을 가져옴

console.log('키와 값을 추가, 제거------------')
myURL.searchParams.append('filter', 'es3') //키와 값 추가,URLSearchParams 객체에 새로운 파라미터를 추가, /&fileter=es3추가가 됨
console.log(myURL.searchParams.get('filter')) //확인

myURL.searchParams.delete('filter') //키와 값 제거,URLSearchParams 객체에서 해당 파라미터를 제거
console.log(myURL.searchParams.get('filter')) //확인

//searchParams 객체를 다시 문자열로 만듬
console.log(myURL.searchParams.toString()) //쿼리스트링으로 변환,URLSearchParams 객체를 쿼리스트링 형태로 변환