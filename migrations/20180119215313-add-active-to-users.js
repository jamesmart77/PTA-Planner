'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.addColumn('users', 'active', Sequelize.BOOLEAN );
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.removeColumn('users', 'active');
  }
};
