'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING(128),
      },
      gtin13: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING(13),
      },
      description: {
        allowNull: false,
        type: Sequelize.STRING(1024),
      },
      images: {
        allowNull: false,
        type: Sequelize.STRING(1024),
      },
      price: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      quantity: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      status: {
        allowNull: false,
        defaultValue: 'AVAILABLE',
        type: Sequelize.ENUM(['AVAILABLE', 'UNAVAILABLE']),
      },
      // Timestamps no formato UTC
      deleted_at: {
        type: Sequelize.DATE,
      },
      created_at: {
        allowNull: false,
        defaultValue: Sequelize.fn('now'),
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        defaultValue: Sequelize.fn('now'),
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('products');
  },
};
