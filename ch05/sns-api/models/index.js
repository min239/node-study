const Sequelize = require('sequelize')
const env = process.env.NODE_ENV || 'development'
const config = require('../config/congif.json')[env]

const User = require('./user')
const Post = require('./post')
const Hashtag = require('./hashtag')

const db = {}
const sequelize = new Sequelize(config.database, config.username, config.password, config) // 데이터베이스 연결 설정

db.sequelize = sequelize // sequelize 인스턴스를 db 객체에 추가
db.User = User  // User 모델을 db 객체에 추가
db.Post = Post  // Post 모델을 db 객체에 추가
db.Hashtag = Hashtag     // Hashtag 모델을 db 객체에 추가

User.init(sequelize) // User 모델 초기화
Post.init(sequelize) // Post 모델 초기화
Hashtag.init(sequelize) // Hashtag 모델 초기화

User.associate(db) // User 모델과 Post 모델의 관계 설정
Post.associate(db) // Post 모델과 User 모델, Hashtag 모델의 관계 설정
Hashtag.associate(db)   // Hashtag 모델과 Post 모델의 관계 설정

module.exports = db
