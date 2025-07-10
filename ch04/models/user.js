const Sequelize = require('sequelize')

//class명은 파일명과 동일하게 작성하는 것이 좋습니다.
module.exports = class User extends Sequelize.Model {
   static init(sequelize) {
      return super.init(
         {
            //name컬럼 정의
            name: {
               type: Sequelize.STRING(20), //VARCHAR(20)와 동일
               allowNull: false, // null 제약조건 -> not null
               unique: true, // unique 제약조건 -> 중복허용 x
            },
            //age컬럼 정의
            age: {
               type: Sequelize.INTEGER.UNSIGNED, //양수만 가능한 정수 ini
               allowNull: false, // null 제약조건 -> not null
            },
            //married컬럼 정의
            married: {
               type: Sequelize.BOOLEAN, //TRUE, FALSE값이 저장되는 타입 tinyint
               allowNull: false, // null 제약조건 -> not null
            },
            //comment컬럼 정의
            comment: {
               type: Sequelize.TEXT, //TEXT타입, 길이제한 없음
               allowNull: false, // null 제약조건 -> not null
            },
            //create_at컬럼 정의
            create_at: {
               type: Sequelize.DATE, //DATETIME타입
               allowNull: false, // null 제약조건 -> not null
               defaultValue: Sequelize.NOW, //디폴트 값으로 현재 시간 설정(sysdate)
            },
         },
         {
            sequelize, // sequelize 인스턴스
            timestamps: false, // createdAt, updatedAt 컬럼 자동 생성 방지
            undeerscored: false, // 컬럼이름을 카멜케이스로 유지 할건지  -> 유지x
            modelName: 'User', // 모델 이름(클래스 이름)
            tableName: 'users', //데이터베이스에서 사용하는 테이블 이름
            paranoid: false, // 소프트 삭제 활성화 여부(deleteAt 컬럼 생성) -> 비활성화
            charset: 'utf8mb4', // 데이터베이스 생성할떄 charset과 똑같이 사용
            collate: 'utf8mb4_general_ci', // 데이터베이스 생성할떄 collate와 똑같이 사용
         }
      )
   }
   static associate(db) {
    db.User.hasMany(db.Comment, { //User가 Comment를 가지고 있다(User 부모테이블, Comment는 자식테이블)
        // User : Comment = 1:N 관계
        foreignKey: 'commenter', // comments 테이블에서 사용할 외래키 컬럼 이름
        sourceKey: 'id', // user테이블에서  comments 테이블에게 외래키로 제공할 컬럼이름
    })
   }
}
