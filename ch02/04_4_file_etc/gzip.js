//파일을 읽은 후 압축
const zlib = require('zlib')
const fs = require('fs')

const readStream = fs.createReadStream('readme4.txt') //파일을 읽어옴

//gzip 압축을 수행하기 위한 변환 스트림 생성
const zlibStream = zlib.createGzip()

//압축된 데이터를 저장하기 위한 쓰기 스트림
const writeStream = fs.createWriteStream('readme4.txt.gz')

//읽기 스트림 -> 압축스트림 -> 쓰기스트림으로 데이터 전달(파이핑 처리)
//readme4.txt 파일 읽고 -> gzip형식으로 압축하고 -> readme4.txt.gz파일에 저장
readStream.pipe(zlibStream).pipe(writeStream)
