'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Match extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Match.belongsTo(models.Preference)
      Match.belongsTo(models.User)
    }
  }
  Match.init({
    MatchId:{
      type:DataTypes.INTEGER,
      references: {
        model : 'Preferences'
      }
    },
    UserId:{
      type:DataTypes.INTEGER,
      references: {
        model : 'Users'
      }
    },
  }, {
    sequelize,
    modelName: 'Match',
  });
  return Match;
}; 