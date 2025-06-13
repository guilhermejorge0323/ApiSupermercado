'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Permission extends Model {
        static associate(models) {
            Permission.belongsToMany(models.User,{
                through: models.User_permission,
                as: 'user_permission',
                foreignKey: 'permission_id'
            });

            Permission.belongsToMany(models.Role,{
                through: models.Role_permission,
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
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: 'Nome da permissao e requerido'
                },
                len: {
                    args: [2,100],
                    msg: 'O nome da parmissao deve ter entre 2 e 100 caracteres'
                }
            }
        },
        desc: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: 'A desc da permissao e requerido'
                },
                len: {
                    args: [2,100],
                    msg: 'A desc da permissao deve ter entre 2 e 100 caracteres'
                }
            }
        }
    }, {
        sequelize,
        modelName: 'Permission',
        tableName: 'permissions',
    });
    return Permission;
};