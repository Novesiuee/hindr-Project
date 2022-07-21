'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Preference extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Preference.belongsTo(models.User)
    }
  }
  Preference.init({
    seekingAge: 
    {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Age preference cannot be empty'
        },
        notNull: {
          msg: 'Age preference cannot be empty'
        }
      }
    },
    seekingGender: 
    {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Gender preference cannot be empty'
        },
        notNull: {
          msg: 'Gender preference cannot be empty'
        }
      }
    },
    seekingHeight:
    {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Height preference cannot be empty'
        },
        notNull: {
          msg: 'Height preference cannot be empty'
        }
      }
    },
    seekingCharacter: 
    {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Character preference cannot be empty'
        },
        notNull: {
          msg: 'Character preference cannot be empty'
        }
      }
    },
    seekingRelationshipType: 
    {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Relationship type preference cannot be empty'
        },
        notNull: {
          msg: 'Relationship type preference cannot be empty'
        }
      }
    },
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Preference',
  });
  return Preference;
};