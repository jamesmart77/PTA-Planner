'use strict';
const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    'first_name': {
      type: DataTypes.STRING,
      allowNull: { args: false, msg: 'First Name is required.' },
      validate: {
        notEmpty: {
          msg: "First Name can not be empty"
        }
      }
    },
    'last_name': {
      type: DataTypes.STRING,
      allowNull: { args: false, msg: 'Last Name is required.' },
      validate: {
        notEmpty: {
          msg: "Last Name can not be empty"
        }
      }
    },
    'email': {
      type: DataTypes.STRING,
      allowNull: { args: false, msg: 'Email Name is required.' },
      unique: {
        msg: 'Email address is already in use.'
      },
      validate: {
        notEmpty: {
          msg: "Email is required"
        }
      }
    },
    'password': {
      type: DataTypes.STRING,
      allowNull: { args: false, msg: 'Password is required.' },
      validate: {
        notEmpty: {
          msg: "Password is required"
        }
      }
    },
    'roleID': {
      type: DataTypes.INTEGER,
      allowNull: { args: false, msg: 'Role is required.' },
      validate: {
        notEmpty: {
          msg: "A user role must be selected at this time"
        }
      }
    },
    active: DataTypes.BOOLEAN,
    'imgUrl': {
      type: DataTypes.STRING,
      defaultValue: '/assets/images/user.png'
    }
  });

  User.beforeCreate((user, options) => {
    return bcrypt.hash(user.password, 10)
        .then(hash => {
            user.password = hash;
        })
        .catch(err => { 
            throw new Error(); 
        });
});

  User.associate = function(models) {
    User.belongsToMany(models.Event, {
      through: models.Staging
    });
  };

  return User;
};