let mongoose = require('mongoose');

mongoose.Promise = global.Promise;

let db = mongoose.createConnection('localhost', 'test');


module.exports = db;
