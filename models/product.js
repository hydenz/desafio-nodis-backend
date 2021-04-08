'use strict';
const { Model } = require('sequelize');
const moment = require('moment');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Product.init(
    {
      name: DataTypes.STRING,
      gtin13: DataTypes.STRING,
      description: DataTypes.STRING,
      images: {
        type: DataTypes.STRING,
        get(value) {
          const rawValue = this.getDataValue(value);
          return rawValue && JSON.parse(rawValue);
        },
        set(value) {
          this.setDataValue('images', JSON.stringify(value));
        },
      },
      price: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,
      status: DataTypes.ENUM(['AVAILABLE', 'UNAVAILABLE']),
      // Timestamps no formato UTC
      // Formatados para o horário local quando acessados
      deletedAt: {
        type: DataTypes.DATE,
        get(value) {
          const rawValue = this.getDataValue(value);
          return rawValue && moment(rawValue).format('YYYY-MM-DD HH:mm:ss');
        },
      },
      createdAt: {
        type: DataTypes.DATE,
        get(value) {
          const rawValue = this.getDataValue(value);
          return rawValue && moment(rawValue).format('YYYY-MM-DD HH:mm:ss');
        },
      },
      updatedAt: {
        type: DataTypes.DATE,
        get(value) {
          const rawValue = this.getDataValue(value);
          return rawValue && moment(rawValue).format('YYYY-MM-DD HH:mm:ss');
        },
      },
    },
    {
      sequelize,
      modelName: 'Product',
      paranoid: true,
      timestamps: true,
      underscored: true,
      tableName: 'products',
    }
  );
  return Product;
};
