'use strict';
const fs = require('fs')
const data = JSON.parse(fs.readFileSync('./data/users.json'))
data.forEach(el => {
  el.createdAt = new Date()
  el.updatedAt = new Date()
});

module.exports = {
  up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    return queryInterface.bulkInsert('Users', data, {})
  },

  down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkInsert('Users', null, {})
  }
};
