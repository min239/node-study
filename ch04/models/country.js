const Sequelize = require('sequelize')

module.exports = class Country extends Sequelize.Model {
   static init(sequelize) {
      return super.init(
         {
            name: {
               type: Sequelize.STRING(100), //varchar(100)
               allowNull: false, //not null
            },
         },
         {
            sequelize, // sequelize 인스턴스
            timestamps: false, // createdAt, updatedAt 컬럼 자동 생성 방지
            undeerscored: false, // 컬럼이름을 카멜케이스로 유지 할건지  -> 유지x
            modelName: 'Country', // 모델 이름(클래스 이름)
            tableName: 'countries', //데이터베이스에서 사용하는 테이블 이름
            paranoid: false, // 소프트 삭제 활성화 여부(deleteAt 컬럼 생성) -> 비활성화
            charset: 'utf8mb4', // 데이터베이스 생성할떄 charset과 똑같이 사용
            collate: 'utf8mb4_general_ci', // 데이터베이스 생성할떄 collate와 똑같이 사용
         }
      )
   }
   static associate(db) {
      db.Country.hasOne(db.Capital, {
         //Country가 Capital을 가지고 있다(Country 부모테이블, Capital은 자식테이블)
         // Country : Capital = 1:1 관계
         // hasOne은 1:1 관계를 나타냅니다.
         foreignKey: 'country_id', // capital 테이블에서 외래키로 사용할 컬럼이름
         sourceKey: 'id', // country 테이블에서 capitals에게 외래키로 제공할 컬럼 이름
      })
   }
}
