'use strict';
module.exports = {
   up(queryInterface, Sequelize) {
     return queryInterface.createTable('Preferences', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      seekingAge: {
        type: Sequelize.INTEGER
      },
      seekingGender: {
        type: Sequelize.STRING
      },
      seekingHeight: {
        type: Sequelize.INTEGER
      },
      seekingCharacter: {
        type: Sequelize.STRING
      },
      seekingRelationshipType: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
   down(queryInterface, Sequelize) {
    return queryInterface.dropTable('Preferences');
  }
};