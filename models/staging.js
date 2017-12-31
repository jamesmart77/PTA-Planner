'use strict';
module.exports = (sequelize, DataTypes) => {
  var Staging = sequelize.define('Staging', {
    event_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Staging;
};