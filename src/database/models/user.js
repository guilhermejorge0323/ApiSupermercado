'use strict';
const cpfValidator = require('../../utils/cpfValidator');
const passwordValidator = require('../../utils/passwordValidator');

const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        static associate(models) {
            User.belongsToMany(models.Role,{
                through: models.User_role,
                as: 'user_role',
                foreignKey: 'user_id'
            });

            User.belongsToMany(models.Permission,{
                through: models.User_permission,
                as: 'user_permission',
                foreignKey: 'user_id'
            });

            User.hasMany(models.Purchase, {
                foreignKey: 'userId',
                onDeleted: 'CASCADE',
            });
        }
    }
    User.init({
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
                    msg: 'Nome e requerido'
                },
                len: {
                    args: [3,100],
                    msg: 'O nome deve ter entre 3 e 100 caracteres'
                }
            }
        },
        email: {
            type: DataTypes.STRING,
            unique: {
                args: true,
                msg: 'E-mail já cadastrado'
            },
            validate: {
                notEmpty: {
                    args: true,
                    msg: 'Email e requerido'
                },
                isEmail: {
                    args: true,
                    msg: 'Formato de email invalido'
                }
            }
        },
        password: {
            type: DataTypes.STRING,
            validate: {
                len: {
                    args: [6,100],
                    msg: 'A senha deve ter entre 6 e 100 caracteres'
                },
                strongPassword: (password) => {
                    console.log(passwordValidator(password));
                    if(!passwordValidator(password)) throw new Error('Senha fraca, no minimo deve ter 1 maiuscula, 1 minuscula, 1 numero e 6 caracteres');
                }
            }

        },
        cpf: {
            type:DataTypes.STRING,
            validate: {
                notEmpty: {
                    args: true,
                    msg: 'CPF e requerido'
                },
                cpfValid: (cpf) => {
                    if(!cpfValidator(cpf)) throw new Error('Cpf invalido');
                }

            }
        }
    }, {
        sequelize,
        modelName: 'User',
        tableName: 'users',
        defaultScope: {
            attributes: {
                exclude: ['password']
            }
        },
        hooks: {
            beforeCreate: async (user) => {
                user.cpf = cpfValidator(user.cpf);
            },

            beforeUpdate: async (user) => {
                const formattedCpf = cpfValidator(user.cpf);

                if (user._previousDataValues.cpf !== formattedCpf) {
                    throw new Error('Não é permitido alterar o CPF');
                }

                user.cpf = formattedCpf;
            }
        }
    });
    return User;
};