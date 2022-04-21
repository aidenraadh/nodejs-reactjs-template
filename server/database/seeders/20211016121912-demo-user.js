'use strict';

const bcrypt = require('bcrypt')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const currentTime = new Date()
    
    return queryInterface.bulkInsert('Users', [{
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: await bcrypt.hash('12345678', 10),
      created_at: currentTime,
      updated_at: currentTime      
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
