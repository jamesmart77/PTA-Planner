'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.addColumn('Users', 'active', Sequelize.BOOLEAN );
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.removeColumn('Users', 'active');
  }
};
