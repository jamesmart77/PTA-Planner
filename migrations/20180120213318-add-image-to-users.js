'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.addColumn('users', 'imgUrl', Sequelize.STRING );
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.removeColumn('users', 'imgUrl');
  }
};
