'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Permission extends Model {
        static associate(models) {
            Permission.belongsToMany(models.User,{
                through: 'user_permissions',
                as: 'permission_user',
                foreignKey: 'permission_id'
            });

            Permission.belongsToMany(models.Role,{
                through: 'role_permission',
                as: 'permission_role',
                foreignKey: 'permission_id'
            });
        }
    }
    Permission.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        name: DataTypes.STRING,
        desc: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Permission',
        tableName: 'permissions',
    });
    return Permission;
};