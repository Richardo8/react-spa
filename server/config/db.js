let mongoose = require('mongoose'),
  db = mongoose.createConnection('localhost', 'test');

module.exports = db;
