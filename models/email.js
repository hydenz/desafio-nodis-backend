'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Email extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Email.init(
    {
      from: DataTypes.STRING,
      to: DataTypes.STRING,
      body: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: 'Email',
      timestamps: false,
      tableName: 'emails',
    }
  );
  return Email;
};
