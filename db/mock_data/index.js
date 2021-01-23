const path = require('path');
const { Seeder } = require('mongo-seeding');
const { DB } = require('../../config/config');

const config = {
  database: DB,
  dropDatabase: true,
};
const seeder = new Seeder(config);
const collections = seeder.readCollectionsFromPath(
  path.resolve('./db/mock_data/data')
);

seeder
  .import(collections)
  .then(() => {
    console.log('Success');
  })
  .catch(err => {
    console.log('Error', err);
  });