const IDb = require('./interfaces/interfaceDb');

class MongoDBStrategy extends IDb {
  constructor() {
    super();
  }
  create(item) {
    return 'MongoDB';
  }
}

module.exports = MongoDBStrategy;
