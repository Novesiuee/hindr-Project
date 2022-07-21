const bcrypt = require('bcryptjs')
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.Preference)
      User.hasMany(models.Match)
    }
  }
  User.init({
    fullName:
    {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Full name cannot be empty'
        },
        notNull: {
          msg: 'Full name cannot be empty'
        }
      }
    },
    email:
    {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Email cannot be empty'
        },
        notNull: {
          msg: 'Email cannot be empty'
        }
      }
    },
    password:
    {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Password cannot be empty'
        },
        notNull: {
          msg: 'Password cannot be empty'
        }
      }
    },

    role:
    {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Role cannot be empty'
        },
        notNull: {
          msg: 'Role cannot be empty'
        }
      }
    },

    imageUrl:
    {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'ImageURL cannot be empty'
        },
        notNull: {
          msg: 'ImageURL cannot be empty'
        }
      }
    },

    gender:
    {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Gender cannot be empty'
        },
        notNull: {
          msg: 'Gender cannot be empty'
        }
      }
    },
    dateOfBirth:
    {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Date of Birth cannot be empty'
        },
        notNull: {
          msg: 'Date of Birth cannot be empty'
        }
      }
    },
    height:
    {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Height cannot be empty'
        },
        notNull: {
          msg: 'Height cannot be empty'
        }
      }
    },
    character:
    {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Character cannot be empty'
        },
        notNull: {
          msg: 'Character cannot be empty'
        }
      }
    },
    userName:
    {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Username cannot be empty'
        },
        notNull: {
          msg: 'Username cannot be empty'
        }
      }
    },
  }, {
    hooks: {
      beforeCreate(user, options) {
        var salt = bcrypt.genSaltSync(8)
        var hash = bcrypt.hashSync(user.password, salt)
        user.password = hash
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};