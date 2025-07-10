const Sequelize = require('sequelize')

module.exports = class Post extends Sequelize.Model {
   static init(sequelize) {
      return super.init(
         {
            content: {
               type: Sequelize.STRING(140), //VARCHAR(140)
               allowNull: false, // not null
            },
            img: {
               type: Sequelize.STRING(200), //VARCHAR(200)
               allowNull: true, // null 허용
            },
         },
         {
            sequelize, // sequelize 인스턴스
            timestamps: true, // createdAt, updatedAt 컬럼 자동 생성
            undeerscored: false, // 컬럼이름을 카멜케이스로 유지 할건지  -> 유지x
            modelName: 'Post', // 모델 이름(클래스 이름)
            tableName: 'posts', //데이터베이스에서 사용하는 테이블 이름
            paranoid: false, // 소프트 삭제 활성화 여부(deleteAt 컬럼 생성) -> 비활성화
            charset: 'utf8mb4', // 데이터베이스 생성할떄 charset과 똑같이 사용
            collate: 'utf8mb4_general_ci', // 데이터베이스 생성할떄 collate와 똑같이 사용
         }
      )
   }
   static associate(db) {
      // n:n 관계 정의
      // through: 'PostHashtag'는 중간 테이블의 이름을 지정합니다
      // PostHashtag 테이블은 Post와 Hashtag의 관계를 나타내는 중간 테이블입니다.
      db.Post.belongsTo(db.User, { through: 'PostHashtag' })
   }
}
