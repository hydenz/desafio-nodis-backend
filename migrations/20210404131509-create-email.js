'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('emails', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      from: {
        allowNull: false,
        type: Sequelize.STRING(64),
      },
      to: {
        allowNull: false,
        type: Sequelize.STRING(64),
      },
      body: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('emails');
  },
};
