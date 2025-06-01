'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Role extends Model {

        static associate(models) {
            Role.belongsToMany(models.User,{
                through: 'user_roles',
                as: 'role_user',
                foreignKey: 'role_id'
            });

            Role.belongsToMany(models.Permission, {
                through: 'role_permissions',
                as: 'role_permission',
                foreignKey: 'role_id'
            });
        }
    }
    Role.init({
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
        modelName: 'Role',
        tableName: 'roles',
    });
    return Role;
};