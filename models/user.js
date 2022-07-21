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
      User.hasOne(models.Match)
      User.hasMany(models.Match)
    }
  }
  User.init({
    fullName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING,
    imageUrl: DataTypes.STRING,
    gender: DataTypes.STRING,
    dateOfBirth: DataTypes.STRING,
    height: DataTypes.INTEGER,
    character: DataTypes.STRING,
    userName: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate(user, options){
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