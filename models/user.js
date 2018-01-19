'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    roleID: DataTypes.INTEGER,
    active: DataTypes.BOOLEAN
  });

  User.associate = function(models) {
    User.belongsToMany(models.Event, {
      through: models.Staging
    });
  };

  return User;
};