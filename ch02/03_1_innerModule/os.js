const os = require('os')
console.log('운영체제 정보------------')
console.log('os.arch():', os.arch()) //운영체제의 CPU 아키텍처
console.log('os.platform():', os.platform()) //운영체제 플랫폼
console.log('os.type():', os.type()) //운영체제 이름
console.log('os.uptime():', os.uptime(), '초') //운영체제 가동 시간(초 단위),부팅이후 흐른 시간
console.log('os.hostname():', os.hostname()) //호스트 이름
console.log('os.release():', os.release()) //운영체제 배포 버전

console.log('경로----------')
console.log(os.homedir()) //사용자 홈 디렉토리
console.log(os.tmpdir()) //임시 디렉토리,임시파일 저장경로

console.log('cpu 정보----------')
console.log(os.cpus()) //CPU 정보,각 코어의 모델명,속도,사용률 등
console.log(os.cpus().length) //CPU 코어 개수

console.log('메모리 정보----------')
console,log(os.freemem()) //사용 가능한 메모리 용량(바이트 단위)
console.log(os.totalmem()) //전체 메모리 용량(바이트 단위)

