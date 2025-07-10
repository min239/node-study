const Sequelize = require('sequelize')
const dotenv = require('dotenv')

const User = require('./user')
const Comment = require('./comment')
const Country = require('./country')
const Capital = require('./capital')
const Post = require('./post') // Post 모델을 가져옵니다
const Hashtag = require('./hashtag') // Hashtag 모델을 가져옵니다

// .env에서 현재 싱행환경(development, production,test 등)을 가져옵니다.
const env = process.env.MODE_ENV || 'development' // 환경변수에서 MODE_ENV를 가져오고, 없으면 development로 설정

//가져온 실행환경에 맞는 db 설정을 가져옴
const config = require('../config/config.json')[env] // config.json에서 환경변수에 맞는 설정을 가져옴
const db = {}
dotenv.config() // .env 파일을 불러와서 환경변수 설정

//sequelize를 사용해서 데이터베이스 연결 객체 생성
const sequelize = new Sequelize(config.database, config.username, config.password, config)

// db 객체를 생성하여 sequelize 객체와 모든 모델들을 저장
db.sequelize = sequelize //db 객체에 sequelize 인스턴스를 추가

//User 모델과 Comment 모델을 db 객체에 추가
db.User = User //db 객체에 User 모델을 추가
db.Comment = Comment //db 객체에 Comment 모델을 추가
db.Country = Country //db 객체에 Country 모델을 추가
db.Capital = Capital //db 객체에 Capital 모델을 추가
db.Post = Post //db 객체에 Post 모델을 추가
db.Hashtag = Hashtag //db 객체에 Hashtag 모델을 추가

//모델을 초기화하고 데이터베이스와 연결
User.init(sequelize) //User 모델 초기화
Comment.init(sequelize) //Comment 모델 초기화
Capital.init(sequelize) //Capital 모델 초기화
Country.init(sequelize) //Country 모델 초기화
Post.init(sequelize) //Post 모델 초기화
Hashtag.init(sequelize) //Hashtag 모델 초기화

//모델 간의 관계를 설정(예-외래키, 연관 테이블 등)
User.associate(db) //User 모델과 Comment 모델 간의 관계 설정
Comment.associate(db) //Comment 모델과 User 모델 간의 관계 설정
Capital.associate(db) //Capital 모델과 Country 모델 간의 관계 설정
Country.associate(db) //Country 모델과 Capital 모델 간의 관계 설정
Post.associate(db) //Post 모델과 User, Hashtag 모델 간의 관계 설정
Hashtag.associate(db) //Hashtag 모델과 Post 모델 간의 관계 설정

//db객체를 모듈로 내보냄
module.exports = db
