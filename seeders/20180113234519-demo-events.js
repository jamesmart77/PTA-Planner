'use strict';
const {readFileSync} = require('fs');
const path = require('path');
const EVENT_SEED_DATA = readFileSync(path.join(__dirname, '../sample_data/events.json'), 'utf8');
const EVENT_SEED_DATA_JSON = JSON.parse(EVENT_SEED_DATA);

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Events', EVENT_SEED_DATA_JSON, {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Events', null, {});
  }
};
