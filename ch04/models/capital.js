const Sequelize = require('sequelize')

module.exports = class Capital extends Sequelize.Model {
   static init(sequelize) {
      return super.init(
         {
            name: {
               type: Sequelize.STRING(100), //VARCHAR(100)
               allowNull: false, // not null
            },
         },
         {
            sequelize, // sequelize 인스턴스
            timestamps: false, // createdAt, updatedAt 컬럼 자동 생성 방지
            undeerscored: false, // 컬럼이름을 카멜케이스로 유지 할건지  -> 유지x
            modelName: 'Capital', // 모델 이름(클래스 이름)
            tableName: 'capitals', //데이터베이스에서 사용하는 테이블 이름
            paranoid: false, // 소프트 삭제 활성화 여부(deleteAt 컬럼 생성) -> 비활성화
            charset: 'utf8mb4', // 데이터베이스 생성할떄 charset과 똑같이 사용
            collate: 'utf8mb4_general_ci', // 데이터베이스 생성할떄 collate와 똑같이 사용
         }
      )
   }
   static associate(db) {
      db.Capital.belongsTo(db.Country, {
         // Capital이 Country를 참조한다(Capital 자식테이블, Country는 부모테이블)
         // Capital : Country = N:1 관계
         foreignKey: 'country_id', // 외래키 컬럼 이름, capital 테이블에서 외래키로 사용할 컬럼명
         targetKey: 'id', // 참조할 대상 테이블의 컬럼 이름, country_id가 country 테이블에서 참조할 컬럼명(country 테이블의 PK)
      })
   }
}
