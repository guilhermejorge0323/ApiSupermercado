const Controller = require('./Controller');
const UserService = require('../services/UserService');
const { hash } = require('bcryptjs');
const { Op } = require('sequelize');

const userService = new UserService();

class UserController extends Controller{
    constructor(){
        super(userService);
    }

    async createUser(req,res,next) {
        const data = req.body;
        try {
            const hashPassword = await hash(data.password,8);
            const objUser = {...data, password: hashPassword};
            const newUser = await userService.createUser(objUser);
            return res.status(201).json({ msg : 'Criado com sucesso', user: newUser });

        } catch (error) {
            console.log(error);
            res.status(500).json(error.message);
        }
    }

    async updateUser(req,res,next) {
        const data = req.body;
        const { userId } = req;
        console.log(userId);
        
        try {
            const user = await userService.updateUser(data, {
                where: {
                    id: userId
                }
            });

            res.status(200).json({ msg : 'Atualizado com sucesso'});
        } catch (error) {
            console.log(error);
            res.status(500).json(error.message);
        }
    }
}

module.exports = UserController;