const Controller = require('./Controller');
const LoginService = require('../services/LoginService');

const loginService = new LoginService();

class LoginController extends Controller {
    constructor() {
        super(loginService);
    }

    async login(req,res,next) {
        const { email, cpf, password } = req.body;

        try {
            const login = await loginService.login({email,cpf,password});
            res.status(200).send(login);
        } catch (error) {
            console.log(error);
            res.status(500).json(error.message);
        }
    }
}

module.exports = LoginController;
