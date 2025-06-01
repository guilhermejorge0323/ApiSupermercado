'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Purchase_item extends Model {
        static associate(models) {
            Purchase_item.belongsTo(models.Purchase, {
                foreignKey: 'purchaseId',
            });

            Purchase_item.belongsTo(models.Product, {
                foreignKey: 'productId',
            });
        }
    }
    Purchase_item.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        quantity: DataTypes.INTEGER,
        price: DataTypes.DECIMAL
    }, {
        sequelize,
        modelName: 'Purchase_item',
        tableName: 'purchase_itens'
    });
    return Purchase_item;
};