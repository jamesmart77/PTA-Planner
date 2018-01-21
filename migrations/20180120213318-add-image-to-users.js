'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.addColumn('Users', 'imgUrl', Sequelize.STRING );
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.removeColumn('Users', 'imgUrl');
  }
};
