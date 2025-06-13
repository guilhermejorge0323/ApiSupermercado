const Service = require('./Service');
const { Op } = require('sequelize');
const { compare } = require('bcrypt');
const { sign } = require('jsonwebtoken');
const jsonSecret = require('../database/config/jsonSecret');
const cpfValidator = require('../utils/cpfValidator');
const validator = require('validator');
const { verify,decode } = require('jsonwebtoken');

class LoginService extends Service {
    constructor(){
        super('User');
    }

    async login(data) {

        const conditions = [];

        if(data.email) {
            const validEmail = validator.isEmail(data.email);
            if(!validEmail) {
                throw new Error('Email invalido');
            }
            conditions.push({ email: data.email });
        }


        if(data.cpf) {
            const formatedCpf = cpfValidator(data.cpf);
            if(!formatedCpf) {
                throw new Error('CPF inválido');
            }
            conditions.push({ cpf: formatedCpf});
        }

        if(conditions.length === 0) {
            throw new Error('Necessario um email ou cpf para login');
        }

        const user = await super.getOne({
            attributes: ['id','email','password'],
            where: {
                [Op.or]: conditions
            }
        });

        


        if(!user) {
            throw new Error('Usuario nao encontrado');
        }

        const passwordCompare = await compare(data.password, user.password);

        if(!passwordCompare) {
            throw new Error('Senha invalida');
        }

        const acessToken = sign(
            {
                id: user.id,
                email: user.email,
            },
            jsonSecret.secret,
            {
                expiresIn: '30d',
            }
        );
        return acessToken;
    }
}
module.exports = LoginService;