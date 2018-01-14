'use strict';
const {readFileSync} = require('fs');
const path = require('path');
const USER_SEED_DATA = readFileSync(path.join(__dirname, '../sample_data/users.json'), 'utf8');
const USER_SEED_DATA_JSON = JSON.parse(USER_SEED_DATA);

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Users', USER_SEED_DATA_JSON, {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Users', null, {});
  }
};
