const { MongoClient } = require('mongodb');
const api = require('./api');
const co = require('co');
const express = require('express');

module.exports = config => co(function*() {
  console.log(`MongoDB connecting to ${config.mongodbUri}`);
  const db = yield MongoClient.connect(config.mongodbUri);

  const app = express().use(api(db));

  app.listen(config.port);
  console.log(`App listening on ${config.port}`);
}).catch(error => {
  console.error(error.stack);
  process.exit(-1);
});
