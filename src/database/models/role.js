'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Role extends Model {

        static associate(models) {
            Role.belongsToMany(models.User,{
                through: models.User_role,
                as: 'user_role',
                foreignKey: 'role_id'
            });

            Role.belongsToMany(models.Permission, {
                through: models.Role_permission,
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
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: 'Nome da role e requerido'
                },
                len: {
                    args: [2,100],
                    msg: 'O nome da role deve ter entre 2 e 100 caracteres'
                }
            }
        },
        desc: {
            type:DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: 'A Desc da role e requerido'
                },
                len: {
                    args: [2,100],
                    msg: 'A Desc da role deve ter entre 2 e 100 caracteres'
                }
            }
        }
    }, {
        sequelize,
        modelName: 'Role',
        tableName: 'roles',
    });
    return Role;
};