const IDb = require('./interfaces/interfaceDb');

class PostgresStrategy extends IDb {
  constructor() {
    super();
  }
  isConnect(){}
  create(item) {
    return 'Postgres';
  }
}

module.exports = PostgresStrategy;
