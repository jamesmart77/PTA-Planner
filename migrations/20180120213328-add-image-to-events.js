'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.addColumn('Events', 'imgUrl', Sequelize.STRING );
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.removeColumn('Events', 'imgUrl');
  }
};
