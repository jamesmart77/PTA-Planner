'use strict';
module.exports = (sequelize, DataTypes) => {
  var Event = sequelize.define('Event', {
    'event_name': {
      type: DataTypes.STRING,
      unique: {
        msg: 'Event Name Must Be Unique.'
      },
      allowNull: { args: false, msg: 'Event Name is required.' },
      validate: {
        notEmpty: {
          msg: "Event Name have a name"
        }
      }
    },
    'start_date': {
      type: DataTypes.DATE,
      allowNull: true,
      allowNull: { args: false, msg: 'Start Date is required.' },
      validate: {
        notEmpty: {
          msg: "Start Date have a name"
        }
      }
    },
    'end_date': {
      type: DataTypes.DATE,
      allowNull: true,
      allowNull: { args: false, msg: 'End Date is required.' },
      validate: {
        notEmpty: {
          msg: "End Date is required."
        }
      }
    },
    'start_time': {
      type: DataTypes.TIME,
      allowNull: true,
      allowNull: { args: false, msg: 'Start Time is required.' },
      validate: {
        notEmpty: {
          msg: "Start Time is required."
        }
      }
    },
    'end_time': {
      type: DataTypes.TIME,
      allowNull: true,
      allowNull: { args: false, msg: 'End Time is required.' },
      validate: {
        notEmpty: {
          msg: "End Time is required."
        }
      }
    }
  }
  );

  Event.associate = function(models) {
    Event.belongsToMany(models.User, {
      through: models.Staging
    });
  };
  
  return Event;
};
