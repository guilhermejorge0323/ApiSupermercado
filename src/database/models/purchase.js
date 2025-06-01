'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Purchase extends Model {
        static associate(models) {
            Purchase.belongsTo(models.User, {
                foreignKey: 'userId',
            });

            Purchase.hasMany(models.Purchase_item, {
                foreignKey: 'purchaseId',
                onDelete: 'CASCADE',
            });
        }
    }
    Purchase.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        total: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'Purchase',
        tableName: 'purchases',
    });
    return Purchase;
};