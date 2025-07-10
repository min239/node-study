const Sequelize = require('sequelize')

module.exports = class User extends Sequelize.Model {
   static init(sequelize) {
      return super.init(
         {
            email: {
               type: Sequelize.STRING(40),
               allowNull: false,
               unique: true,
            },
            nick: {
               type: Sequelize.STRING(15),
               allowNull: false,
            },
            password: {
               type: Sequelize.STRING(100),
               allowNull: false,
            },
         },
         {
            sequelize, 
            timestamps: true, //createAt, updateAt 자동 생성
            underscored: false, 
            modelName: 'User', // 모델 이름
            tableName: 'users', // 테이블 이름
            paranoid: true, // deleteAt 자동생성, 소프트 삭제
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci', 
         }
      )
   }
   static associate(db) {// User 모델과 Post 모델의 관계 설정
      db.User.hasMany(db.Post, { 
         foreignKey: 'user_id', // User 모델의 user_id 컬럼이 Post 모델의 user_id 컬럼을 참조
         sourceKey: 'id',   // Post 모델의 user_id 컬럼이 User 모델의 id 컬럼을 참조
      })
   }
}
