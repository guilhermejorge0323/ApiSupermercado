'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Product extends Model {
        static associate(models) {
            Product.hasMany(models.Purchase_item,{
                foreignKey: 'productId',
                onDelete: 'CASCADE'
            });
        }
    }
    Product.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        name: DataTypes.STRING,
        price: DataTypes.DECIMAL,
        quantity: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'Product',
        tableName: 'products',
    });
    return Product;
};