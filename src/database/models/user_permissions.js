'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class User_permission extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
        static associate(models) {
            // define association here
        }
    }
    User_permission.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        user_id: DataTypes.UUID,
        permission_id: DataTypes.UUID
    }, {
        sequelize,
        modelName: 'User_permission',
        tableName: 'user_permissions'
    });
    return User_permission;
};