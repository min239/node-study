const Sequelize = require('sequelize')

module.exports = class comment extends Sequelize.Model {
   static init(sequelize) {
      return super.init(
         {
            comment: {
               type: Sequelize.STRING(100), //VARCHAR(100)와 동일
               allowNull: false, // null 제약조건 -> not null
            },
            create_at: {
               type: Sequelize.DATE, //DATETIME타입
               allowNull: true, // null 제약조건 -> not null
               defaultValue: Sequelize.NOW, //디폴트 값으로 현재 시간 설정(sysdate)
            },
         },
         {
            sequelize, // sequelize 인스턴스
            timestamps: false, // createdAt, updatedAt 컬럼 자동 생성 방지
            undeerscored: false, // 컬럼이름을 카멜케이스로 유지 할건지  -> 유지x
            modelName: 'Comment', // 모델 이름(클래스 이름)
            tableName: 'comments', //데이터베이스에서 사용하는 테이블 이름
            paranoid: false, // 소프트 삭제 활성화 여부(deleteAt 컬럼 생성) -> 비활성화
            charset: 'utf8mb4', // 데이터베이스 생성할떄 charset과 똑같이 사용
            collate: 'utf8mb4_general_ci', // 데이터베이스 생성할떄 collate와 똑같이 사용
         }
      )
   }
   static associate(db) {
        db.Comment.belongsTo(db.User, { // User 모델과 1:N 관계 설정, Comment는 User에 속함(User가 부모테이블, Comment는 자식테이블)
            foreignKey: 'commenter', // comments 테이블에서 사용할 외래키 컬럼 이름
            targetKey: 'id', //commenter가 users 테이블에서 참조하는 컬럼이름(user테이블의 PK)
        })
   }
}
