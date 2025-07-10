const Sequelize = require('sequelize')

module.exports = class Post extends Sequelize.Model {
   static init(sequelize) {
      return super.init(
         {
            // 글내용
            content: {
               type: Sequelize.TEXT,
               allowNull: false,
            },
            // 이미지 경로
            img: {
               type: Sequelize.STRING(200),
               allowNull: true,
            },
         },
         {
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'Post',
            tableName: 'posts',
            paranoid: true,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
         }
      )
   }
   static associate(db) {  // Post 모델과 User 모델, Hashtag 모델의 관계 설정
      db.Post.belongsTo(db.User, { // User 모델과의 관계 설정
         foreignKey: 'user_id', // Post 모델의 user_id 컬럼이 User 모델의 user_id 컬럼을 참조
         targetKey: 'id', // User 모델의 id 컬럼이 Post 모델의 user_id 컬럼을 참조
      }) 

      db.Post.belongsToMany(db.Hashtag, { // 다대다 관계 설정 
         through: 'PostHashtag', 
         foreignKey: 'post_id', // 교차테이블에서 Post 모델의 FK
         otherKey: 'hashtag_id', // Hashtag 모델의 FK
      })
   }
}
