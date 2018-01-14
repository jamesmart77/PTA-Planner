'use strict';
const {readFileSync} = require('fs');
const path = require('path');
const STAGING_SEED_DATA = readFileSync(path.join(__dirname, '../sample_data/staging.json'), 'utf8');
const STAGING_SEED_DATA_JSON = JSON.parse(STAGING_SEED_DATA);

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Stagings', STAGING_SEED_DATA_JSON, {});
},

down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Stagings', null, {});
}
};
