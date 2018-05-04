const mongoose = require('mongoose');
mongoose.Promise = Promise;

let client = null;

const configInit = (mongoConfig) => {
  const connectUrl = (mongoConfig.uri) ? mongoConfig.uri : `mongodb://${mongoConfig.host}:${mongoConfig.port}/${mongoConfig.database}`;
  return new Promise((resolve, reject) => {
    client = mongoose.connection;
    client.on('error', err => reject(err));
    client.once('open', () => resolve(this.client));
    mongoose.connect(connectUrl, {
      useMongoClient: true,
    });
  });
};

const init = (app) => configInit(app.config.mongo);
const close = () => mongoose.connection.close();

export const MongooseWrapper = {
  init,
  close,
};
