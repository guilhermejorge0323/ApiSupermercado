const Service = require('./Service');
const db = require('../database/models');
const cpfValidator = require('../utils/cpfValidator');
const { Op } = require('sequelize');

class UserService extends Service {
    constructor() {
        super('User');
    }

    async createUser(data) {
        const formatedCpf = cpfValidator(data.cpf);
        const userCpf = await super.getOne({ where: { cpf: formatedCpf } });
        if (userCpf) {
            throw new Error('cpf ja cadastrado');
        }

        const userEmail = await super.getOne({ where: { email: data.email } });
        if (userEmail) {
            throw new Error('email ja cadastrado');
        }

        const newUser = await db.User.create(data);

        return newUser;
    }

    async updateUser(data,obj) {
        const instance = await super.getOne(obj);
        if (!instance) {
            throw new Error('Usuario não encontrado');
        }
        if(data.email) {
            const existing = await super.getOne({
                where: {
                    email: data.email,
                    id: { [Op.ne]: instance.id }
                }
            });

            if (existing) {
                throw new Error('Ja existe um Usuario com esse email');
            }
        }

        if(data.password) {
            throw new Error('Nao permitido alteracao de senha por essa rota');
        }
        instance.set(data);

        return instance.save();
    }

}

module.exports = UserService;