const mongoose = require('mongoose');
const { DB } = require('../config/config.js');
const { MongoMemoryServer } = require('mongodb-memory-server');

const mongod = new MongoMemoryServer({instance: {dbPath:"C:\\data\\db"}});

function connect() {
  return new Promise((resolve, reject) => {

    if (process.env.NODE_ENV === 'test') {
      

      const mongooseOpts = {
          useNewUrlParser: true,
          //autoReconnect: true,
          useUnifiedTopology: true,
          //reconnectTries: Number.MAX_VALUE,
          //reconnectInterval: 10000,
          //useMongoClient: true, // remove this line if you use mongoose 5 and above
      };
      
      mongod.getUri().then((uri) => {
        mongoose.connect(uri, mongooseOpts)
        .then((res, err) => {
          if (err) {
            return reject(err)};
          resolve();
        })
      })
      
    } else {
        mongoose.connect(DB,
          { useNewUrlParser: true, useCreateIndex: true,  useUnifiedTopology: true,  useFindAndModify: false  })
          .then((res, err) => {
            if (err) return reject(err);
            resolve();
          })
    }
  });
}

function close() {
    mongod.stop();
    return mongoose.disconnect();
  
}


module.exports.closeDatabase = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongod.stop();
}

module.exports = { connect, close };