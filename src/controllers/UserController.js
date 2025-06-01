const Controller = require('./Controller');
const UserService = require('../services/UserService');
const { hash } = require('bcryptjs');

const userService = new UserService();

class UserController extends Controller{
    constructor(){
        super(userService);
    }

    async createUser(req,res,next) {
        const data = req.body;
        try {
            const userCpf = await userService.getOne({ where: { cpf: data.cpf } });
            if (userCpf) {
                return res.status(400).json({ msg: 'cpf ja cadastrado' });
            }

            const userEmail = await userService.getOne({ where: { email: data.email } });
            if (userEmail) {
                return res.status(400).json({ msg: 'Email ja cadastrado' });
            }

            const hashPassword = await hash(data.password,8);
            const objUser = {...data, password: hashPassword};
            const newUser = await userService.create(objUser);
            return res.status(201).json({ msg : 'Criado com sucesso', user: newUser });

        } catch (error) {
            console.log(error);
            res.status(500).json(error.message);
        }
    }
}

module.exports = UserController;